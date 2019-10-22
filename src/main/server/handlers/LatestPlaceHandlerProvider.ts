import { RequestHandler } from 'express';
import { HandlerProvider } from './HandlerProvider';
import { CompositePlaceIndex } from '../index/CompositePlaceIndex';
import { QueryUtils } from '../utils/QueryUtils';
import { PageUtils } from '../utils/PageUtils';

export class LatestPlaceHandlerProvider implements HandlerProvider {
    
    constructor(
        private index: CompositePlaceIndex
    ) { }

    getRoute(): string {
        return "/api/latest";
    }
    
    getHandler(): RequestHandler {
        return (req, res) => {
            var pageIndex = QueryUtils.parsePageIndex(req.query);
            console.log(`Request for latest places page ${ pageIndex }`);    

            var countries = req.body["countries"] as string[];

            var latestPlaces = this.index.queryPlaces(countries);
            
            res.json(PageUtils.getPage(latestPlaces, pageIndex));
        };
    }
}