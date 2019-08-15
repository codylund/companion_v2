export class QueryUtils {
    private constructor() { }

    static parsePageIndex(query: any) {
        if (!query) {
            console.log(`No query provided. Returning first page.`);
            return 0;
        }

        var pageIndex = query["page"];
        if (!pageIndex || pageIndex < 0) {
            console.warn(`Invalid page index ${ pageIndex }. Returning first page.`);
            return 0;
        }
    
        console.log(`Request for page index ${ pageIndex }`);
        return pageIndex;
    }
}