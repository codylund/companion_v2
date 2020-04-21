import { Place } from './Place';

export class PlacePage {
    pageIndex: number;
    totalPages: number;
    places: Place[];

    constructor(json: any) {
        this.pageIndex = json.pageIndex,
        this.totalPages = json.totalPages,
        this.places = json.places.map(Place.fromJSON)
    }
}