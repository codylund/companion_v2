import { readdirSync, readFileSync } from 'fs'
import { join } from 'path'

import { Nugget } from '../../shared/model'
import { CompositeNuggetIndex } from '../shared/index/CompositeNuggetIndex'

export class IndexFactory {

    private constructor() { }

    static initCompositIndex(contentDir: string) {
        return new CompositeNuggetIndex(
            readdirSync(contentDir)
                .map((file) => readFileSync(join(contentDir, file), 'utf8'))
                .map((val) => JSON.parse(val))
                .map((json) => new Nugget(json))
        );
    }
}