import { RequestHandler, Request, Response, NextFunction } from 'express';
import { CompositePlaceIndex } from '../index/CompositePlaceIndex';
import { HandlerProvider } from './HandlerProvider';

export default class PlaceHandlerProvider implements HandlerProvider {

    constructor(
        private index: CompositePlaceIndex
    ) { }

    getHandler(): RequestHandler {
        return (req: Request, res: Response, next: NextFunction) => {
            var placeId = req.params["id"];
            if (!this.index.hasPlace(placeId)) {
                res.send();
            }
        
            var place = this.index.getPlace(placeId);
            res.json(place);
        };
    }
    getRoute(): string {
        return "/api/places/:id";
    }

}
