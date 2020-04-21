import { PlaceContent } from './PlaceContent';
import { PlaceMetadata } from './PlaceMetadata';
import { Photo } from '.';

export class Place {
    content: PlaceContent;
    metadata: PlaceMetadata;

    constructor() {
        this.content = new PlaceContent();
        this.metadata = new PlaceMetadata();
    }

    static fromJSON(json: any) {
        var place = new Place();
        
        place.content = PlaceContent.fromJSON(json.content);
        place.metadata = PlaceMetadata.fromJSON(json.metadata);

        return place;
    }

    static compareByDate(a: Place, b: Place): number {
        return b.metadata.date.getTime()
            - a.metadata.date.getTime();
    }

    static compareByTitle(a: Place, b: Place): number {
        return a.metadata.title.localeCompare(b.metadata.title, 'en', {sensitivity: 'base'});
    }
}