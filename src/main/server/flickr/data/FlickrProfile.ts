import { FlickrPhotoAlbum } from './FlickrPhotoAlbum';

/**
 * Flickr user profile.
 */
export class FlickrProfile {
    userId: string;
    albums: FlickrPhotoAlbum[] = []
}