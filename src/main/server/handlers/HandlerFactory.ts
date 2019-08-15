import { HandlerProvider } from './HandlerProvider';
import NuggetHandlerProvider from './NuggetHandlerProvider';
import { LatestNuggetHandlerProvider } from './LatestNuggetHandlerProvider';
import { SearchHandlerProvider } from './SearchHandlerProvider';
import { CompositeNuggetIndex } from '../index/CompositeNuggetIndex';


export class HandlerFactory {
    constructor(
        private index: CompositeNuggetIndex
    ) {
    }

    GET(): HandlerProvider[] {
        return [
            new NuggetHandlerProvider(this.index),
            new LatestNuggetHandlerProvider(this.index)
        ];
    }

    POST(): HandlerProvider[] {
        return [
            new SearchHandlerProvider(this.index)
        ];
    }
}