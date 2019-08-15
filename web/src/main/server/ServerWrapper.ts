import * as express from "express";
import { Express } from 'express';
import { ServerConfig } from './ServerConfig';
import { HandlerProvider } from './handlers/HandlerProvider';
import { MiddlewareProvider } from './MiddlewareProvider';

export class ServerWrapper {
    
    private server: Express;
    
    constructor(
        private config: ServerConfig,
        private middleware: MiddlewareProvider,
        private getHandlers: HandlerProvider[],
        private postHandlers: HandlerProvider[]
    ){ }

    start() {
        this.init();
        this.listen();
    }

    private init() {
        if (this.server)
            return;

        this.server = express();
        
        // Setup the middleware.
        this.middleware.get().forEach((val) => this.server.use(val));

        // Set up all the GET routes.
        this.getHandlers.forEach((val) => {
            console.log(`Init handler GET ${ val.getRoute() }`);
            this.server.get(val.getRoute(), val.getHandler());
        });

        // Serve the index file from the static root for all unknown GET routes.
        this.server.get('*', (req, res) => {
            res.sendFile('/index.html', { root: this.config.static });
        });

        // Set up all the POST routes.
        this.postHandlers.forEach((val) => {
            console.log(`Init handler POST ${ val.getRoute() }`);
            this.server.post(val.getRoute(), val.getHandler());
        });
    }

    private listen() {
        this.config.ports.forEach((port) => {
            this.server.listen(port, () => {
                console.log( `Listening on port ${ port }.` );
            });
        });
    }
}