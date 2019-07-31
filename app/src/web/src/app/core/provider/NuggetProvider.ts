import { Nugget } from 'shared/lib/model';
import { Observable } from 'rxjs';

export interface NuggetProvider {
    getNugget(id: string): Observable<Nugget>
}