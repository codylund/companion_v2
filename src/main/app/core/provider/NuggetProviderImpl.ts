import { HttpClient } from '@angular/common/http';
import { Nugget } from '../../../shared/model';
import { map } from 'rxjs/operators'
import { NuggetProvider } from './NuggetProvider';
import { Observable } from 'rxjs';
import { NuggetPage } from '../../../shared/model/NuggetPage';
import { NuggetFilters } from '../site/NuggetFilters';

export class NuggetProviderImpl implements NuggetProvider {

    constructor(
        private http: HttpClient,
        private endpoint: string
    ) { }

    getNugget(id: string) {
        console.log(`Getting nugget with id ${ id }`)
        return this.http.get(this.getNuggetRequestUrl(id))
            .pipe(map(res => new Nugget(res)));
    }

    getRandom(): Observable<Nugget> {
        return this.http.get(`${ this.endpoint }/api/random`)
            .pipe(map(res => new Nugget(res)));
    }

    getLatest(pageIndex: number, filters: NuggetFilters): Observable<NuggetPage>  {
        var url = this.getLatestUrl(pageIndex);

        return this.http.post(url, {
            countries: filters.countries
        }).pipe(map(res => new NuggetPage(res)));
    }

    private getNuggetRequestUrl(id: string) {
        return `${ this.endpoint }/api/nugget/${ id }`;
    }

    private getLatestUrl(pageIndex: number) {
        return `${ this.endpoint }/api/latest?page=${ pageIndex }`;
    }
}