import { FlickrProfile } from './data/FlickrProfile';
import { FlickrGetAlbumsRequest, FlickrGetAlbumPhotoIdsRequest, FlickrGetPhotoUrlRequest } from './FlickrRequest';
import { FlickrPhotoAlbum } from './data/FlickrPhotoAlbum';
import { FlickrPhoto } from './data/FlickrPhoto';

export function buildFlickrProfile(userId: string): Promise<FlickrProfile> {
    // Start creating a new profile.
    var profile = new FlickrProfile();
    profile.userId = userId;

    // Update the photo albums in the profile.
    return updateAlbums(profile);
}

/**
 *  Take the provided profile and update it's photo albums.
 */
function updateAlbums(profile: FlickrProfile): Promise<FlickrProfile> {
    return new FlickrGetAlbumsRequest(profile.userId).get().then(albums => {
        return Promise.all(albums.map(updateAlbumPhotos))
    }).then(albums => {
        profile.albums = albums;
        return Promise.resolve(profile);
    });
}

/**
 * Take the provided album and update its photos.
 */
function updateAlbumPhotos(album: FlickrPhotoAlbum): Promise<FlickrPhotoAlbum> {
        return new FlickrGetAlbumPhotoIdsRequest(album.id).get().then(photos => {
            // For each photo, we also need to update the URL.
            return Promise.all(photos.map(updatePhotoUrls));
        // The album photos are fully loaded.
        }).then(photos => {
            album.photos = photos;
            return Promise.resolve(album);
        });
}

/**
 * Take the provided photo and update its url.
 */
function updatePhotoUrls(photo: FlickrPhoto): Promise<FlickrPhoto> {
    return new FlickrGetPhotoUrlRequest(photo.id).get().then(url => {
        // Update the url for the photo.
        photo.url = url;
        // Resolve the promise for the photo.
        return Promise.resolve(photo);
    });
}