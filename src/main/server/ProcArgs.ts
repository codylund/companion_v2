import * as commandLineArgs from 'command-line-args';
import { ServerConfig } from './ServerConfig';

export class ProcArgs {

    static optionsDefinitions = [
        { name: "port", type: Number, multiple: true, defaultValue: [8080] },
        { name: "static", type: String, multiple: false },
        { name: "content", type: String, multiple: false },
        { name: "prod", type: Boolean, defaultValue: false }
    ];

    static parseServerConfig(): ServerConfig {
        var options = commandLineArgs(this.optionsDefinitions)

        var serverConfig = new ServerConfig();

        if (!options.port || options.port.length <= 0) {
            console.log("No port provided. Using default 8080.");
            serverConfig.ports = [8080];
        } else {
            serverConfig.ports = options.port;
        }

        if (!options.static) {
            throw new Error("No static content directory provided.");
        }
        serverConfig.static = options.static.valueOf();

        if (!options.content) {
            throw new Error("No content directory provided.");
        }
        serverConfig.content = options.content.valueOf();

        if (options.prod) {
            serverConfig.prod = true;
        }

        return serverConfig;
    }
}