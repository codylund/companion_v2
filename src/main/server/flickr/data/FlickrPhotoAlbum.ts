import { Photo } from '../../../shared/model';
import { FlickrPhoto } from './FlickrPhoto';

export class FlickrPhotoAlbum {
    id: string;
    dateCreate: Date;
    dateUpdated: Date;
    title: string;
    description: string;
    photos: FlickrPhoto[];
}