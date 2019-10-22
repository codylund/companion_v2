import { flickrRequest } from './FlickrRequest';
import { Photo } from '../../shared/model';

export class FlickrPhotoAlbum {
    static get(albumId: string): Promise<Photo[]> {
        return flickrRequest('flickr.photosets.getPhotos', [
            {
                key: 'photoset_id',
                value: albumId
            }
        ]).then(value => {
            var ids = (value.rsp.photoset[0].photo as any[]).map((photo) => photo['$'].id);
            return Promise.all(ids.map(id => flickrRequest('flickr.photos.getSizes', [
                {
                    key: 'photo_id',
                    value: id
                }
            ])));
        }).then(values => {
            return values
                // Get the list of image links for each photo.
                .map(value => value.rsp.sizes[0].size as any[])
                // Find the link corresponding to the large image.
                .map(sizes => sizes.filter(size => size['$'].label == 'Large 2048').shift())
                // Get the source URL.
                .map(size => size['$'].source as string)
                // Convert to a photo object.
                .map(url => new Photo(url, ''));
        })
    }
}