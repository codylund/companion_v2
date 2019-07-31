import { readdirSync, readFileSync } from 'fs'
import { join } from 'path'

import { Nugget } from 'shared/lib/model/Nugget'
import { CompositeNuggetIndex } from '../../server-remote/shared/src/index/CompositeNuggetIndex'

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