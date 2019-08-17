import { Nugget } from '../../shared/model'
import { NuggetIndex } from './NuggetIndex';
import { ArrayUtils } from '../utils/ArrayUtils'
import { IgnoreCaseIndexOption } from './IgnoreCaseIndexOption';
import { NoPuncIndexOption } from './NoPuncIndexOption';

export class CompositeNuggetIndex {

    private idIndex = new NuggetIndex<string>(new IgnoreCaseIndexOption());
    private dateList = new Array<Nugget>();
    private tagIndex = new NuggetIndex<string>(
        // Ignore case.
        new IgnoreCaseIndexOption(),
        // Ignore punctuation.
        new NoPuncIndexOption()
    );
    
    constructor(nuggets: Nugget[]) {
        nuggets.forEach((nugget) => {
            var metadata = nugget.metadata;
            
            // Populate the by-id index.
            this.idIndex.put(metadata.id, nugget);
            
            // Populate the by-date index.
            this.dateList.push(nugget);

            // Populate the by-tag index.
            metadata.tags.forEach((tag) => this.tagIndex.put(tag.toLowerCase(), nugget));
        });

        // Sort the date list
        this.dateList = this.dateList.sort(Nugget.compareByDate);    
    }

    hasNugget(id: string): boolean {
        return this.idIndex.get(id).length > 0;
    }

    getNugget(id: string): Nugget {
        return this.idIndex.get(id)[0];
    }

    latestNuggets() {
        return this.dateList;
    }

    queryNuggets(query: string, tags: string[]): Nugget[] {
        var lists = new Array<Nugget[]>();
        
        if (tags && tags.length > 0) {
            // Get all the nuggets with the provided tags.
            lists.push(this.tagIndex.get(...tags));
        }
        
        if (lists.length <= 0) {
            // We can't reduce an empty array!
            return [];
        }

        return lists.reduce((prev, cur, idx) => {
            // Intersect the lists.
            return (idx == 0) ? cur : ArrayUtils.intersect(prev, cur);
        });
    }
}