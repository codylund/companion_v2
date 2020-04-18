import { readdirSync, readFileSync } from 'fs'
import { join } from 'path'

import { Place, Photo } from '../shared/model'
import { CompositePlaceIndex } from './index/CompositePlaceIndex'
import { buildFlickrProfile } from './flickr/FlickrProfileBuilder';
import { schedule } from 'node-cron';

export class IndexFactory {

    private constructor() { }

    static initCompositIndex(contentDir: string) {
        var index = new CompositePlaceIndex();
        
        var places = readdirSync(contentDir)
            .map((file) => {
                console.log(`Adding json file to index: ${ file }`);
                return readFileSync(join(contentDir, file), 'utf8');
            })
            .map((val) => JSON.parse(val))
            .map((json) => Place.fromJSON(json));
        index.setPlaces(places);
        
        return index
    }

    static initFlickrIndex(flickrUserId: string) {
        var index = new CompositePlaceIndex();

        // Function to update places in index from Flickr.
        var updatePlacesInIndex = () => {
            buildFlickrProfile(flickrUserId).then(profile => {
                // Convert each album in the profile to a place.
                var places = profile.albums.map(album => {
                    var place = new Place();
    
                    // Set place metadata.
                    place.metadata.id = album.title.toLowerCase()
                        // Replace any non-alpha or space characters.
                        .replace(/[^a-z\s]/gi, "")
                        // Trim whitespace and replace with hypens.
                        .trim()
                        .replace(/\s/gi, "-");
                    place.metadata.title = album.title;
                    place.metadata.date = album.dateCreate;
    
                    // Set place content.
                    place.content.synopsis = album.description;
                    place.content.photos = album.photos.map(photo => new Photo(photo.url));
    
                    return place;
                });

                // Pass the places to the index.
                index.setPlaces(places);
            })
        };

        // Update places from Flickr immediately. Then, schedule a recurring
        // daily job to requery the places so we can pick up new albums.
        updatePlacesInIndex();
        schedule("0 * * * *", updatePlacesInIndex);

        return index;
    }

    private static getPlacesFromFlickr(flickrUserId: string) {
        return buildFlickrProfile(flickrUserId).then(profile => {
            // Convert each album in the profile to a place.
            var places = profile.albums.map(album => {
                var place = new Place();

                place.metadata.id = album.title.toLowerCase()
                    // Replace any non-alpha or space characters.
                    .replace(/[^a-z\s]/gi, "")
                    // Trim whitespace and replace with hypens.
                    .trim()
                    .replace(/\s/gi, "-");
                place.metadata.title = album.title;
                place.metadata.date = album.dateCreate;

                place.content.synopsis = album.description;
                place.content.photos = album.photos.map(photo => new Photo(photo.url));

                return place;
            });

            return Promise.resolve(places);
        })
    }
}