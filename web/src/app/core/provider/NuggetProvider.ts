import { Nugget } from '../model/Nugget.model';
import { Observable } from 'rxjs';

export interface NuggetProvider {
    getNugget(id: string): Observable<Nugget>
}