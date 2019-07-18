import { Photo } from './Photo.model';

export class NuggetContent {
    title: String;
    synopsis: String;
    body: String;
    photos: Photo[] = [];

    constructor(json: any) {
        this.title = json.title;
        this.synopsis = json.synopsis;
        this.body = json.body;
        for (var photo of json.photos as any[]) {
            this.photos.push(new Photo(photo.url, photo.caption))
        }
    }
}