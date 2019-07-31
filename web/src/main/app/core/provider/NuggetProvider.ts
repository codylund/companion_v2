import { Nugget } from '../../../shared/model';
import { Observable } from 'rxjs';

export interface NuggetProvider {
    getNugget(id: string): Observable<Nugget>
}