import { RequestHandler } from 'express';
import { HandlerProvider } from './HandlerProvider';
import { FlickrPhotoAlbum } from '../flickr/FlickrPhotoAlbum';

export class FlickrPhotoAlbumHandlerProvider implements HandlerProvider {

    getRoute(): string {
        return "/api/getFlickrAlbum";
    }
    
    getHandler(): RequestHandler {
        return (req, res) => {
            var albumId = this.parseAlbumId(req.query);

            FlickrPhotoAlbum.get(albumId).then(photos => {
                res.json(photos);
            }).catch(reason => {
                throw new Error(reason);
            })
        };
    }

    private parseAlbumId(query: any) {
        if (!query) {
            throw new Error(`No query provided.`);
        }

        var albumId = query["albumId"];
        if (!albumId) {
            throw new Error(`No album id provided.`);
        }

        return albumId;
    }
}