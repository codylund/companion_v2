import { Nugget } from '../../shared/model';
import { NuggetPage } from '../../shared/model/NuggetPage';

export class PageUtils {

    private static NUGGETS_PER_PAGE = 10;
    
    constructor() { }

    static getPage(nuggets: Nugget[], pageIndex: number): NuggetPage {
        // Start of the slice (inclusive)
        var startSlice = PageUtils.NUGGETS_PER_PAGE * pageIndex;
        // End of the slice (non-inconclusive).
        var endSlice = Math.min(nuggets.length, PageUtils.NUGGETS_PER_PAGE * (pageIndex + 1));
        
        return {
            nuggets: nuggets.slice(startSlice, endSlice),
            pageIndex: pageIndex,
            totalPages: Math.ceil(nuggets.length / PageUtils.NUGGETS_PER_PAGE)
        };
    }
}