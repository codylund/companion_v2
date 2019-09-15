import { HandlerProvider } from './HandlerProvider';
import NuggetHandlerProvider from './NuggetHandlerProvider';
import { LatestNuggetHandlerProvider } from './LatestNuggetHandlerProvider';
import { CompositeNuggetIndex } from '../index/CompositeNuggetIndex';


export class HandlerFactory {
    constructor(
        private index: CompositeNuggetIndex
    ) {
    }

    GET(): HandlerProvider[] {
        return [
            new NuggetHandlerProvider(this.index)
        ];
    }

    POST(): HandlerProvider[] {
        return [
            new LatestNuggetHandlerProvider(this.index)
        ];
    }
}