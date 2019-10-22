import { RequestHandler } from 'express';
import { HandlerProvider } from './HandlerProvider';
import { getLatestHighlight } from '../data/InstagramHighlightsRepo';

export class InstagramHighlightsHandlerProvider implements HandlerProvider {

    getRoute(): string {
        return "/api/highlights";
    }
    
    getHandler(): RequestHandler {
        return (req, res) => {            
            res.json(getLatestHighlight());
        };
    }
}