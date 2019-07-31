import { Injectable } from '@angular/core';
import { NuggetQueryType } from './NuggetQueryType';
import { ActivityType } from 'shared/lib/model/ActivityType';
import { NuggetProviderFactory } from '../provider/NuggetProviderFactory';
import { NuggetProvider } from '../provider/NuggetProvider';

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

  getNuggetPage(queryType: NuggetQueryType, pageIndex: Number) {
    return [this.getNugget('0'), this.getNugget('1'), this.getNugget('1'), this.getNugget('1')];
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
