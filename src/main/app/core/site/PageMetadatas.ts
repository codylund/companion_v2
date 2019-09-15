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
        title: "Cody Lund"
    };

    /**
     * Page title for the Who page.
     */
    static who: PageMetadata = {
        title: "Who is Cody Lund?"
    };
    
    /**
     * Page title for main list of places.
     */
    static places: PageMetadata = {
        title: "Cody Lund | Oh, the places I've been!"
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