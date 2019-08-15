import { HandlerProvider } from './HandlerProvider';
import { RequestHandler } from 'express';
import { QueryUtils } from '../utils/QueryUtils';
import { PageUtils } from '../utils/PageUtils';
import { CompositeNuggetIndex } from '../index/CompositeNuggetIndex';

export class SearchHandlerProvider implements HandlerProvider {
    
    constructor(
        private index: CompositeNuggetIndex
    ) { }
    
    getHandler(): RequestHandler {
        return (req, res) => {
            var pageIndex = QueryUtils.parsePageIndex(req.query);
    
            var tags = req.body["tags"] as string[];
        
            res.json(
                PageUtils.getPage(
                    this.index.queryNuggets('', tags),
                    pageIndex
                )
            );
        };
    }
    
    getRoute(): string {
        return "/api/query";
    }
}