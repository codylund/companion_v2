import * as Express from "express";
import * as Cors from "cors";
import * as BodyParser from "body-parser";
import { RequestHandler } from 'express';
import { ServerConfig } from './ServerConfig';
import { HTTPS } from 'express-sslify';

export class MiddlewareProvider {

    constructor(
        private serverConfig: ServerConfig
    ) { }

    get(): RequestHandler[] {
        return [
            Express.static(this.serverConfig.static),
            Cors(),
            BodyParser.json(),
            HTTPS({ trustProtoHeader: true })
        ];
    }
}