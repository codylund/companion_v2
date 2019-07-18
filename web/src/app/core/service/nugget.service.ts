import { Injectable } from '@angular/core';
import { Nugget } from '../model/Nugget.model';
import { NuggetQueryType } from './NuggetQueryType';
import { LocalNuggetProvider } from '../provider/LocalNuggetProvider';

@Injectable({
  providedIn: 'root'
})
export class NuggetService {

  constructor(private nuggetProvider: LocalNuggetProvider) {
  }

  getLatestNugget() {
    return this.getNuggets(NuggetQueryType.ByNew, 0, 1)[0];
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
    return [this.getNugget('')];
  }

  getNugget(id: string) {
    return this.nuggetProvider.getNugget(id);
  }

  search(term: string) {

  }

  
}
