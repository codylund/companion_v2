import { RequestHandler, Request, Response, NextFunction } from 'express';
import { CompositeNuggetIndex } from '../index/CompositeNuggetIndex';
import { HandlerProvider } from './HandlerProvider';

export default class NuggetHandlerProvider implements HandlerProvider {

    constructor(
        private index: CompositeNuggetIndex
    ) { }

    getHandler(): RequestHandler {
        return (req: Request, res: Response, next: NextFunction) => {
            var nuggetId = req.params["id"];
            if (!this.index.hasNugget(nuggetId)) {
                res.send();
            }
        
            var nugget = this.index.getNugget(nuggetId);
            res.json(nugget);
        };
    }
    getRoute(): string {
        return "/api/nugget/:id";
    }

}
