import { RequestHandler } from 'express';

export interface HandlerProvider {
    getHandler(): RequestHandler
    getRoute(): string
}