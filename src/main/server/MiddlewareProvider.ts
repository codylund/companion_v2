import * as Express from "express";
import * as Cors from "cors";
import * as BodyParser from "body-parser";
import { RequestHandler } from 'express';
import { ServerConfig } from './ServerConfig';
import { HTTPS } from 'express-sslify';
import { isDevMode } from "@angular/core";

export class MiddlewareProvider {

    constructor(
        private serverConfig: ServerConfig
    ) { }

    get(): RequestHandler[] {
        var middlewares = [];

        if (this.serverConfig.prod) {
            // Only add the HTTPS middleware if we are in prod mode.
            middlewares.push(HTTPS({ trustProtoHeader: true }));
        } else {
            console.log("Skipping prod middlewares");
        }

        middlewares.push(...[
            Express.static(this.serverConfig.static),
            Cors(),
            BodyParser.json(),
        ]);

        return middlewares;
    }
}