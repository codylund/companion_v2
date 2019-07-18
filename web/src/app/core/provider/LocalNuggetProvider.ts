import { HttpClient } from '@angular/common/http';
import { mergeMap, map } from 'rxjs/operators';
import { NuggetIndex } from './NuggetIndex';
import { Nugget } from '../model/Nugget.model';
import { Injectable } from '@angular/core';
import { NuggetProvider } from './NuggetProvider';

@Injectable({
    providedIn: 'root'
})
export class LocalNuggetProvider implements NuggetProvider {

    private static PATH_POSTS = 'assets/posts'

    private nuggetIndex?: NuggetIndex;

    constructor(private http: HttpClient) {
    }

    getNugget(id: string) {
        if (!this.nuggetIndex) {
            // Initialize the index before getting the requested nugget.
            return this.getIndex().pipe(mergeMap(body => {
                this.nuggetIndex = new NuggetIndex(body);
                return this.getNuggetPostInit(id);
            }))
        }

        // The index is already initialized, so get the requested nugget.
        return this.getNuggetPostInit(id);
    }

    private getIndex() {
        return this.http.get(LocalNuggetProvider.getFullPath("nuggets.json"));
    }

    private getNuggetPostInit(id: string) {
        return this.http.get(
            LocalNuggetProvider.getFullPath(this.nuggetIndex.getNuggetFilename(id))
        ).pipe(map(json => new Nugget(json)));
    }

    private static getFullPath(filename: string) {
        return `${LocalNuggetProvider.PATH_POSTS}/${filename}`;
    }

}