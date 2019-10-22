import { readdirSync, readFileSync } from 'fs'
import { join } from 'path'

import { Place } from '../shared/model'
import { CompositePlaceIndex } from './index/CompositePlaceIndex'

export class IndexFactory {

    private constructor() { }

    static initCompositIndex(contentDir: string) {
        return new CompositePlaceIndex(
            readdirSync(contentDir)
                .map((file) => {
                    console.log(`Adding json file to index: ${ file }`);
                    return readFileSync(join(contentDir, file), 'utf8');
                })
                .map((val) => JSON.parse(val))
                .map((json) => new Place(json))
        );
    }
}