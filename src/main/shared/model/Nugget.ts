import { NuggetContent } from './NuggetContent';
import { NuggetMetadata } from './NuggetMetadata';

export class Nugget {
    content: NuggetContent;
    metadata: NuggetMetadata;

    constructor(json: any) {
        this.content = new NuggetContent(json.content);
        this.metadata = new NuggetMetadata(json.metadata);
    }

    static compareByDate(a: Nugget, b: Nugget): number {
        return new Date(b.metadata.date).getTime()
            - new Date(a.metadata.date).getTime();
    }
}