import { PageMetadata } from './PageMetadata';
import { NuggetMetadata } from 'src/main/shared/model';

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
    static forPlace(nuggetMetadata: NuggetMetadata): PageMetadata {
        return {
            title: `Visit ${nuggetMetadata.title} in ${nuggetMetadata.location.toString()}`
        };
    }
}