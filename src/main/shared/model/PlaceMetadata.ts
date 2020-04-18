import { Location } from './Location';

export class PlaceMetadata {
    id: string;
    title: string;
    date: Date;
    location?: Location;
    tags: string[];

    static fromJSON(json: any) {
        var metadata = new PlaceMetadata();

        metadata.id = json.id;
        metadata.title = json.title;
        metadata.date = new Date(json.date);
        if (json.location)
            metadata.location = new Location(json.location);
        metadata.tags = json.tags;

        return metadata;
    }
}