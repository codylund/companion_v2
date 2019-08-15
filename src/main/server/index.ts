import { IndexFactory } from "./IndexFactory";
import { HandlerFactory } from './handlers/HandlerFactory';
import { ServerWrapper } from './ServerWrapper';
import { MiddlewareProvider } from './MiddlewareProvider';
import { ProcArgs } from './ProcArgs';

var config = ProcArgs.parseServerConfig();

var handlerFactory = new HandlerFactory(IndexFactory.initCompositIndex(config.content));

new ServerWrapper(
    config,
    new MiddlewareProvider(config),
    handlerFactory.GET(),
    handlerFactory.POST()
).start();