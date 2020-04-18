import { Photo } from './Photo';

export class PlaceContent {
    synopsis: string;
    body: string;
    photos: Photo[] = [];

    static fromJSON(json: any): PlaceContent {
        var content = new PlaceContent();
        
        content.synopsis = json.synopsis;
        content.body = json.body;
        for (var photo of json.photos as any[]) {
            content.photos.push(new Photo(photo.url, photo.caption))
        }

        return content;
    }
}