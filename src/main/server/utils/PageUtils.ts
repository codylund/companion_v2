import { Place } from '../../shared/model';
import { PlacePage } from '../../shared/model/PlacePage';

export class PageUtils {

    private static PLACES_PER_PAGE = 10;
    
    constructor() { }

    static getPage(places: Place[], pageIndex: number): PlacePage {
        // Start of the slice (inclusive)
        var startSlice = PageUtils.PLACES_PER_PAGE * pageIndex;
        // End of the slice (non-inconclusive).
        var endSlice = Math.min(places.length, PageUtils.PLACES_PER_PAGE * (pageIndex + 1));
        
        return {
            places: places.slice(startSlice, endSlice),
            pageIndex: pageIndex,
            totalPages: Math.ceil(places.length / PageUtils.PLACES_PER_PAGE)
        };
    }
}