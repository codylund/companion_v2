import { ActivityType } from './ActivityType';
import { Location } from './Location';

export class NuggetMetadata {
    id: string;
    title: string;
    date: Date;
    location: Location;
    tags: string[];
    activityTypes: ActivityType[];

    constructor(json: any) {
        this.id = json.id;
        this.title = json.title;
        this.date = new Date(json.date);
        this.location = new Location(json.location);
        this.tags = json.tags;
        this.activityTypes = json.activityTypes
    }
}