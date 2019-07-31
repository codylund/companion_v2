import * as Express from "express";
import * as Cors from "cors";
import { join } from "path"; 
import * as BodyParser from "body-parser";

import { IndexFactory } from "./IndexFactory";
import { ActivityType, Nugget } from "../../shared/model";

var root: string = process.argv[3];
console.log(`Serving static assets from ${ join(root) }`)
var contentDir: string = process.argv[4];
console.log(`Initializing content from ${ join(contentDir) }`);

const server = Express();
const port = 8080;

const index = IndexFactory.initCompositIndex(contentDir);

server.use(Cors());
server.use(BodyParser());

server.use(Express.static(root));

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

function flattenNuggetJSON(nugget: Nugget) {
    return {
        // Flatten metadata and content as expected 
        // by the client.
        ...JSON.parse(JSON.stringify(nugget.metadata)),
        ...JSON.parse(JSON.stringify(nugget.content)),
    };
}