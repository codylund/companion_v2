export class Photo {
    url: string;
    caption?: string;

    constructor(url: string, caption?: string) {
        this.url = url;
        this.caption = caption;
    }
}