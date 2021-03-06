import { HandlerProvider } from './HandlerProvider';
import PlaceHandlerProvider from './PlaceHandlerProvider';
import { LatestPlaceHandlerProvider } from './LatestPlaceHandlerProvider';
import { CompositePlaceIndex } from '../index/CompositePlaceIndex';
import { FlickrPhotoAlbumHandlerProvider } from './FlickrPhotoAlbumHandlerProvider';
import { SubscriptionHandlerProvider } from './SubscriptionHandlerProvider';


export class HandlerFactory {
    constructor(
        private index: CompositePlaceIndex
    ) {
    }

    GET(): HandlerProvider[] {
        return [
            new PlaceHandlerProvider(this.index),
            new FlickrPhotoAlbumHandlerProvider()
        ];
    }

    POST(): HandlerProvider[] {
        return [
            new LatestPlaceHandlerProvider(this.index),
            new SubscriptionHandlerProvider()
        ];
    }
}