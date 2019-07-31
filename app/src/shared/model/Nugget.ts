import { NuggetContent } from './NuggetContent';
import { NuggetMetadata } from './NuggetMetadata';

export class Nugget {
    content: NuggetContent;
    metadata: NuggetMetadata;

    constructor(json: any) {
        this.content = new NuggetContent(json);
        this.metadata = new NuggetMetadata(json);
    }

    static compareByDate(a: Nugget, b: Nugget): number {
        return new Date(a.metadata.date).getMilliseconds() 
            - new Date(b.metadata.date).getMilliseconds();
    }
}