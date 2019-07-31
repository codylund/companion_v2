import { Photo } from './Photo';

export class NuggetContent {
    synopsis: string;
    body: string;
    photos: Photo[] = [];

    constructor(json: any) {
        this.synopsis = json.synopsis;
        this.body = json.body;
        for (var photo of json.photos as any[]) {
            this.photos.push(new Photo(photo.url, photo.caption))
        }
    }
}