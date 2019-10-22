import { HandlerProvider } from './HandlerProvider';
import PlaceHandlerProvider from './PlaceHandlerProvider';
import { LatestPlaceHandlerProvider } from './LatestPlaceHandlerProvider';
import { CompositePlaceIndex } from '../index/CompositePlaceIndex';
import { InstagramHighlightsHandlerProvider } from './InstagramHightlightsHandlerProvider';
import { FlickrPhotoAlbumHandlerProvider } from './FlickrPhotoAlbumHandlerProvider';


export class HandlerFactory {
    constructor(
        private index: CompositePlaceIndex
    ) {
    }

    GET(): HandlerProvider[] {
        return [
            new PlaceHandlerProvider(this.index),
            new InstagramHighlightsHandlerProvider(),
            new FlickrPhotoAlbumHandlerProvider()
        ];
    }

    POST(): HandlerProvider[] {
        return [
            new LatestPlaceHandlerProvider(this.index)
        ];
    }
}