import { Nugget } from '../../../shared/model';
import { Observable } from 'rxjs';
import { NuggetPage } from '../../../shared/model/NuggetPage';
import { NuggetFilters } from '../site/NuggetFilters';

export interface NuggetProvider {
    getNugget(id: string): Observable<Nugget>
    getLatest(pageIndex: number, filters: NuggetFilters): Observable<NuggetPage>
}