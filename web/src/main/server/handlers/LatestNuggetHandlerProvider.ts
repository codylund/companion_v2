import { RequestHandler } from 'express';
import { HandlerProvider } from './HandlerProvider';
import { CompositeNuggetIndex } from '../index/CompositeNuggetIndex';
import { QueryUtils } from '../utils/QueryUtils';
import { PageUtils } from '../utils/PageUtils';

export class LatestNuggetHandlerProvider implements HandlerProvider {
    
    constructor(
        private index: CompositeNuggetIndex
    ) { }

    getRoute(): string {
        return "/api/latest";
    }
    
    getHandler(): RequestHandler {
        return (req, res, next) => {
            var pageIndex = QueryUtils.parsePageIndex(req.query);
            console.log(`Request for latest nuggets page ${ pageIndex }`);    

            var latestNuggets = this.index.latestNuggets()
            
            res.json(PageUtils.getPage(latestNuggets, pageIndex));
        };
    }


}