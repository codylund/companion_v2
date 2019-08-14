import { Nugget } from '../../../shared/model';
import { Observable } from 'rxjs';
import { NuggetPage } from '../../../shared/model/NuggetPage';

export interface NuggetProvider {
    getNugget(id: string): Observable<Nugget>
    getLatest(pageIndex: number): Observable<NuggetPage>
}