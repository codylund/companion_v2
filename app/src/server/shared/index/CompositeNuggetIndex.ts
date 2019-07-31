import { ActivityType } from 'shared/lib/model/ActivityType';
import { Nugget } from 'shared/lib/model/Nugget'
import { NuggetIndex } from './NuggetIndex';
import { ArrayUtils } from '../util/ArrayUtils'
import { IgnoreCaseIndexOption } from './IgnoreCaseIndexOption';
import { NoPuncIndexOption } from './NoPuncIndexOption';

export class CompositeNuggetIndex {

    private idIndex = new NuggetIndex<string>(new IgnoreCaseIndexOption());
    private tagIndex = new NuggetIndex<string>(
        // 
        new IgnoreCaseIndexOption(),
        // Ignore punctuation.
        new NoPuncIndexOption()
    );
    private activityTypeIndex = new NuggetIndex<ActivityType>();
    
    constructor(nuggets: Nugget[]) {
        nuggets.forEach((nugget) => {
            var metadata = nugget.metadata;
            
            // Populate the by-id index.
            this.idIndex.put(metadata.id, nugget);
            
            // Populate the by-tag index.
            metadata.tags.forEach((tag) => this.tagIndex.put(tag.toLowerCase(), nugget));
            
            // Populate the by-activity-type index.
            metadata.activityTypes.forEach((type) => this.activityTypeIndex.put(type, nugget));
        });
    }

    getNugget(id: string): Nugget {
        return this.idIndex.get(id)[0];
    }

    queryNuggets(query: string, tags: string[], activityTypes: ActivityType[]): Nugget[] {
        var lists = new Array<Nugget[]>();
        
        if (tags && tags.length > 0) {
            // Get all the nuggets with the provided tags.
            lists.push(this.tagIndex.get(...tags));
        }
        
        if (activityTypes && activityTypes.length > 0) {
            // Get all the nuggets with the provided activity types
            lists.push(this.activityTypeIndex.get(...activityTypes))
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