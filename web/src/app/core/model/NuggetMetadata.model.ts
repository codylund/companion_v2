import { ActivityType } from './ActivityType';

export class NuggetMetadata {
    id: string;
    date: Date;
    location: string;
    activityTypes: ActivityType[];
    tags: string[];
    filename?: string;

    constructor(json: any) {
        this.id = json.id;
        this.date = new Date(json.date);
        this.location = json.location;
        this.tags = json.tags;
        this.activityTypes = json.activityTypes
    }
}