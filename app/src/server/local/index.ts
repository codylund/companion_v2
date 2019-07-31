import express from "express";
import cors from "cors";
import { join } from "path"; 
import bodyParser from "body-parser";

import { IndexFactory } from "./IndexFactory";
import { ActivityType } from "shared/lib/model/ActivityType";
import { Nugget } from "shared/lib/model/Nugget";

export function startTestServer(root: string, contentDir: string) {
    const server = express();
    const port = 8080;

    const index = IndexFactory.initCompositIndex(contentDir);

    server.use(cors());
    server.use(bodyParser());

    console.log(`Serving static assets from ${ join(root) }`)
    server.use(express.static(root));

    server.get("/api/nugget/:id", (req, res) => {
        var nuggetId = req.params["id"];
        console.log(`Request for nugget with id ${ nuggetId }`);

        var nugget = index.getNugget(nuggetId);
        res.json(flattenNuggetJSON(nugget));
    });

    server.post("/api/query", (req, res) => {
        var tags = req.body["tags"] as string[];
        var activityTypes = req.body["activityTypes"] as ActivityType[];

        res.json(index.queryNuggets('', tags, activityTypes).map(flattenNuggetJSON));
    });

    server.get('*', (req, res) => {
        res.sendFile('index.html', { root: root });
    });

    server.listen(port, () => {
        console.log( `server started at http://localhost:${ port }` );
    });
};

function flattenNuggetJSON(nugget: Nugget) {
    return {
        // Flatten metadata and content as expected 
        // by the client.
        ...JSON.parse(JSON.stringify(nugget.metadata)),
        ...JSON.parse(JSON.stringify(nugget.content)),
    };
}