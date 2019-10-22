import { PlaceContent } from './PlaceContent';
import { PlaceMetadata } from './PlaceMetadata';

export class Place {
    content: PlaceContent;
    metadata: PlaceMetadata;

    constructor(json: any) {
        this.content = new PlaceContent(json.content);
        this.metadata = new PlaceMetadata(json.metadata);
    }

    static compareByDate(a: Place, b: Place): number {
        return new Date(b.metadata.date).getTime()
            - new Date(a.metadata.date).getTime();
    }

    static compareByTitle(a: Place, b: Place): number {
        return a.metadata.title.localeCompare(b.metadata.title, 'en', {sensitivity: 'base'});
    }
}