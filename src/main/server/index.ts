import { IndexFactory } from "./IndexFactory";
import { HandlerFactory } from './handlers/HandlerFactory';
import { ServerWrapper } from './ServerWrapper';
import { MiddlewareProvider } from './MiddlewareProvider';
import { ProcArgs } from './ProcArgs';
import * as dotenv from 'dotenv';

var config = ProcArgs.parseServerConfig();

dotenv.config();
console.log(process.env.FLICKR_API_KEY);

var handlerFactory = new HandlerFactory(IndexFactory.initFlickrIndex("95025333@N08"));

new ServerWrapper(
    config,
    new MiddlewareProvider(config),
    handlerFactory.GET(),
    handlerFactory.POST()
).start();