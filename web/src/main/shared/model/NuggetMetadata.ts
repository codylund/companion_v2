import { ActivityType } from './ActivityType';

export class NuggetMetadata {
    id: string;
    title: string;
    date: Date;
    location: string;
    activityTypes: ActivityType[];
    tags: string[];
    thumbnailPath: string;
    filename?: string;

    constructor(json: any) {
        this.id = json.id;
        this.title = json.title;
        this.date = new Date(json.date);
        this.location = json.location;
        this.tags = json.tags;
        this.activityTypes = json.activityTypes
        this.thumbnailPath = json.photos[0].url;
    }
}