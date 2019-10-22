import { Location } from './Location';

export class PlaceMetadata {
    id: string;
    title: string;
    date: Date;
    location: Location;
    tags: string[];

    constructor(json: any) {
        this.id = json.id;
        this.title = json.title;
        this.date = new Date(json.date);
        this.location = new Location(json.location);
        this.tags = json.tags;
    }
}