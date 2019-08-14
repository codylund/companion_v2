import { HttpClient } from '@angular/common/http';
import { ActivityType, Nugget } from '../../../shared/model';
import { map } from 'rxjs/operators'
import { NuggetProvider } from './NuggetProvider';
import { Observable } from 'rxjs';
import { NuggetPage } from '../../../shared/model/NuggetPage';

export class NuggetProviderImpl implements NuggetProvider {

    constructor(
        private http: HttpClient,
        private host: string,
        private port: number
    ) { }

    getNugget(id: string) {
        console.log(`Getting nugget with id ${ id }`)
        return this.http.get(this.getNuggetRequestUrl(id))
            .pipe(map(res => new Nugget(res)));
    }

    getLatest(pageIndex: number): Observable<NuggetPage>  {
        var url = this.getLatestUrl(pageIndex);
        console.log(`GET ${ url }`);

        return this.http.get(url).pipe(map(res => new NuggetPage(res)));
    }

    queryNuggets(query?: string, tags?: string[], activityTypes?: ActivityType[]) {

    }

    private getNuggetRequestUrl(id: string) {
        return `${ this.host }:${ this.port }/api/nugget/${ id }`;
    }

    private getLatestUrl(pageIndex: number) {
        return `${ this.host }:${ this.port }/api/latest?page=${ pageIndex }`;
    }
}