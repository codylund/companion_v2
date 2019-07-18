import { NuggetContent } from './NuggetContent.model';
import { NuggetMetadata } from './NuggetMetadata.model';

export class Nugget {
    content: NuggetContent;
    metadata: NuggetMetadata;

    constructor(json: any) {
        this.content = new NuggetContent(json);
        this.metadata = new NuggetMetadata(json);
    }
}