import { isArray } from 'util';
import { NuggetIndexItem } from './NuggetIndexItem';
import { NuggetMetadata } from '../model/NuggetMetadata.model';

export class NuggetIndex {

    private nuggets = new Map<string, NuggetMetadata>();

    constructor(json: any) {
        // Input JSON should be an array of JSON objects.
        if (!isArray(json)) {
            console.error('Error constructing NuggetMetadata - expected JSON array.')
            return;
        }

        for(var i = 0; i < json.length; i++) {
            var nugget = json[i];

            if (!nugget.id || !nugget.filename 
                || (nugget.tags && !isArray(nugget.tags))) {
                continue;
            }

            var nuggetMetadata = new NuggetMetadata(nugget);
            nuggetMetadata.id = nugget.id;
            nuggetMetadata.filename = nugget.filename;
            nuggetMetadata.tags = nugget.tags;

            this.nuggets.set(nuggetMetadata.id, nuggetMetadata);
        }
    }

    getNuggetFilename(id: string) {
        return this.nuggets.get(id).filename
    }
}