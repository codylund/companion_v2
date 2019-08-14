import { ActivityType } from './ActivityType';

export class NuggetMetadata {
    id: string;
    title: string;
    date: Date;
    location: string;
    tags: string[];
    activityTypes: ActivityType[];

    constructor(json: any) {
        this.id = json.id;
        this.title = json.title;
        this.date = new Date(json.date);
        this.location = json.location;
        this.tags = json.tags;
        this.activityTypes = json.activityTypes
    }
}