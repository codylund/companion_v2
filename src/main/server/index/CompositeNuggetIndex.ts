import { Nugget } from '../../shared/model'
import { NuggetIndex } from './NuggetIndex';
import { ArrayUtils } from '../utils/ArrayUtils'
import { IgnoreCaseIndexOption } from './IgnoreCaseIndexOption';

export class CompositeNuggetIndex {

    private idIndex = new NuggetIndex<string>(new IgnoreCaseIndexOption());
    private countryIndex = new NuggetIndex<string>(new IgnoreCaseIndexOption());
    private dateList = new Array<Nugget>();

    constructor(nuggets: Nugget[]) {
        nuggets.forEach((nugget) => {
            var metadata = nugget.metadata;
            
            // Populate the by-id index.
            this.idIndex.put(metadata.id, nugget);
            
            // Populate the by-country index.
            this.countryIndex.put(metadata.location.country, nugget);

            // Populate the by-date index.
            this.dateList.push(nugget);
        });

        // Sort the date list
        this.dateList.sort(Nugget.compareByDate);
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

    queryNuggets(countries: string[]): Nugget[] {
        var lists = new Array<Nugget[]>();

        lists.push(
            this.latestNuggets()
                .filter(nugget => countries.length <= 0 
                    || countries.indexOf(nugget.metadata.location.country) >= 0
                )
        );
        
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