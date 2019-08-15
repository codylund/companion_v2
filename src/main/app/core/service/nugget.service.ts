import { Injectable } from '@angular/core';
import { NuggetQueryType } from './NuggetQueryType';
import { ActivityType, Nugget } from '../../../shared/model';
import { NuggetProviderFactory } from '../provider/NuggetProviderFactory';
import { NuggetProvider } from '../provider/NuggetProvider';
import { NuggetPage } from 'src/main/shared/model/NuggetPage';
import { Observable, Subscriber } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NuggetService {

  private nuggetProvider: NuggetProvider;

  constructor(nuggetProviderFactory: NuggetProviderFactory) {
    this.nuggetProvider = nuggetProviderFactory.getInstance();
  }

  getLatestNugget() {
    return this.getNuggets(NuggetQueryType.ByNew, 0, 1)[0];
  }

  getNuggetPage(queryType: NuggetQueryType, pageIndex: number): Observable<NuggetPage> {
    switch(queryType) {
      case NuggetQueryType.ByNew:
      default:
        return this.nuggetProvider.getLatest(pageIndex);
    }
  }

  searchNuggets(query: string, tags?: string[], activityTypes?: ActivityType[]) {

  }

  getNuggets(queryType: NuggetQueryType, startIndex: Number, count: Number, attributes?: Map<string, Object>) {
    switch(queryType) {
      case NuggetQueryType.ByNew:
        break;
      case NuggetQueryType.ByTop:
        break;
      default:
        break;
    }
    return [this.getNugget('0')];
  }

  getNugget(id: string) {
    return this.nuggetProvider.getNugget(id);
  }

  search(term: string) {

  }

  
}
