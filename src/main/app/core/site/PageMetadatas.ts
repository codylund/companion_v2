import { PageMetadata } from './PageMetadata';
import { PlaceMetadata } from 'src/main/shared/model';

/**
 * Various titles for the website.
 */
export class PageMetadatas {
    /**
     * Default page title.
     */
    static default: PageMetadata = {
        title: "Waste Your Twenties"
    };

    /**
     * Page title for the Who page.
     */
    static who: PageMetadata = {
        title: "Who"
    };
    
    /**
     * Page title for main list of places.
     */
    static places: PageMetadata = {
        title: "Oh, the places you'll go!"
    };
    
    /**
     * Page title for a specific place.
     * 
     * @param place
     *      The name of the place.
     * 
     * @returns the title.
     */
    static forPlace(placeMetadata: PlaceMetadata): PageMetadata {
        var title = `Visit ${placeMetadata.title}`;
        if (placeMetadata.location) {
            title += ` in ${placeMetadata.location.toString()}`;
        }
        return { title: title };
    }
}