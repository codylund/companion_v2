import { Place } from '../../shared/model'
import { PlaceIndex } from './PlaceIndex';
import { ArrayUtils } from '../utils/ArrayUtils'
import { IgnoreCaseIndexOption } from './IgnoreCaseIndexOption';

export class CompositePlaceIndex {

    private idIndex = new PlaceIndex<string>(new IgnoreCaseIndexOption());
    private countryIndex = new PlaceIndex<string>(new IgnoreCaseIndexOption());
    private dateList = new Array<Place>();

    setPlaces(places: Place[]) {
        this.idIndex.clearPlaces();
        this.countryIndex.clearPlaces();
        this.dateList = [];

        places.forEach((place) => {
            var metadata = place.metadata;
            
            // Populate the by-id index.
            this.idIndex.put(metadata.id, place);
            
            // Populate the by-country index.
            if (metadata.location != null) {
                this.countryIndex.put(metadata.location.country, place);
            }

            // Populate the by-date index.
            this.dateList.push(place);
        });

        // Sort the date list
        this.dateList.sort(Place.compareByDate);
    }

    hasPlace(id: string): boolean {
        return this.idIndex.get(id).length > 0;
    }

    getPlace(id: string): Place {
        return this.idIndex.get(id)[0];
    }

    latestPlaces() {
        return this.dateList;
    }

    queryPlaces(countries: string[]): Place[] {
        var lists = new Array<Place[]>();

        lists.push(
            this.latestPlaces()
                .filter(place => countries.length <= 0 
                    || countries.indexOf(place.metadata.location.country) >= 0
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