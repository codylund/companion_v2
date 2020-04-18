import { request } from 'https';
import { QueryParam, toQueryString } from './QueryParam';
import { parseString } from 'xml2js';
import { FlickrPhotoAlbum } from './data/FlickrPhotoAlbum';
import { FlickrPhoto } from './data/FlickrPhoto';

abstract class FlickrRequest<T> {

    private mParams: QueryParam[] = [
        {
            key: 'api_key',
            value: process.env.FLICKR_API_KEY
        }
    ];
    
    constructor(
        method: string,
        params: QueryParam[]
    ) {
        // Add method string
        this.mParams.push({
            key: 'method',
            value: method
        })

        params.forEach((param) => {
            this.mParams.push(param)
        })
    }

    get(): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            request({
                protocol: 'https:',
                hostname: 'www.flickr.com',
                port: 443,
                path: '/services/rest/?' + toQueryString(this.mParams)
            }, res => {
                res.on('data', d => {
                    parseString(d as string, (err, xml) => {
                        if (err)
                            reject(err);
        
                        if (xml.rsp.err) {
                            console.log(xml.rsp.err);
                            reject(new Error(xml.rsp.err));
                        }
        
                        resolve(this.parseXmlResponse(xml));
                    });
                })
            }).on('error', error => {
                reject(error);
            }).end();
        });
    }

    abstract parseXmlResponse(xml: any): T
}

export class FlickrGetAlbumsRequest extends FlickrRequest<FlickrPhotoAlbum[]> {

    private static readonly METHOD = "flickr.photosets.getList";

    constructor(userId: string) {
        super(FlickrGetAlbumsRequest.METHOD,
            [ 
                new QueryParam('user_id', userId)
            ]
        )
    }

    parseXmlResponse(xml: any): FlickrPhotoAlbum[] {
        console.log(xml);

        if (xml.rsp == null)
            return null;
    
        if (xml.rsp.photosets == null)
            return null;

        var photosetsXml = xml.rsp.photosets[0].photoset as any[];

        return photosetsXml.map(photosetXml => {
            console.log(photosetXml);

            var album = new FlickrPhotoAlbum()
            
            // Get attribute value in id.
            album.id = photosetXml['$'].id;
            // Get attribute value in date_create.
            album.dateCreate = getDateFromFlickrString(photosetXml['$'].date_create);
            // Get attribute vaue in date_update.
            album.dateUpdated = getDateFromFlickrString(photosetXml['$'].date_update);
            // Get character content in <title>.
            album.title = photosetXml.title[0];
            // Get character content in <description>.
            album.description = photosetXml.description[0];
            
            return album;
        });
    }
}

function getDateFromFlickrString(dateString: string): Date {
    // Flickr returns dates using seconds since Epoch.
    return new Date(Number.parseInt(dateString) * 1000);
}

export class FlickrGetAlbumPhotoIdsRequest extends FlickrRequest<FlickrPhoto[]> {

    private static readonly METHOD = "flickr.photosets.getPhotos";

    constructor(albumId: string) {
        super(FlickrGetAlbumPhotoIdsRequest.METHOD,
            [ 
                new QueryParam('photoset_id', albumId)
            ]
        )
    }

    parseXmlResponse(xml: any): FlickrPhoto[] {
        if (xml.rsp == null)
            return null;

        if (xml.rsp.photoset[0] == null)
            return null;

        var photosXml = xml.rsp.photoset[0].photo as any[];

        return photosXml.map(photoXml => {
            var photo = new FlickrPhoto()

            photo.id = photoXml['$'].id;
            photo.isPrimary = Number.parseInt(photoXml['$'].isprimary) == 1;

            return photo;
        });
    }
}

export class FlickrGetPhotoUrlRequest extends FlickrRequest<string> {
    private static readonly METHOD = "flickr.photos.getSizes";

    constructor(photoId: string) {
        super(FlickrGetPhotoUrlRequest.METHOD,
            [ 
                new QueryParam('photo_id', photoId)
            ]
        )
    }

    parseXmlResponse(xml: any): string {
        if (xml.rsp == null)
            return null;

        if (xml.rsp.sizes == null)
            return null;

        var sizesXml = xml.rsp.sizes[0].size as any[];

        var largeSizeXml = sizesXml.filter(size => size['$'].label == 'Large 2048').shift();

        return largeSizeXml['$'].source;
    }
}
