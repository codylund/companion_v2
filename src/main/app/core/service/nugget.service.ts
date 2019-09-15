import { Injectable } from '@angular/core';
import { Nugget } from '../../../shared/model';
import { NuggetProviderFactory } from '../provider/NuggetProviderFactory';
import { NuggetProvider } from '../provider/NuggetProvider';
import { Observable } from 'rxjs';
import { LoadedNuggets } from '../site/LoadedNuggets';
import { count } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NuggetService {

  private nuggetProvider: NuggetProvider;

  private nuggets: Nugget[] = []

  private countries: string[] = [];

  private nuggetsSubscribers: ((nuggets: LoadedNuggets) => any)[] = [] 

  /**
   * Observable for watching nuggets to display.
   */
  private nuggetsObservable = new Observable<LoadedNuggets>((observer)=>{
    // Handler passing the observer more nuggets.
    const handler = (nuggets: LoadedNuggets) => observer.next(nuggets);
    
    // Track the handler.
    this.nuggetsSubscribers.push(handler);

    // Return function to unsubscribe.
    return () => {
      var index = this.nuggetsSubscribers.indexOf(handler)
      this.nuggetsSubscribers = this.nuggetsSubscribers.splice(index, 1);
    }
  });

  /**
   * The next page to load.
   */
  private nextPage = 0;

  constructor(nuggetProviderFactory: NuggetProviderFactory) {
    this.nuggetProvider = nuggetProviderFactory.getInstance();
  }

  observeCurrentNuggets(): Observable<LoadedNuggets> {
    return this.nuggetsObservable;
  }

  /**
   * Asynchronously load more nuggets.
   */
  loadMore() {
    this.nuggetProvider.getLatest(this.nextPage++, {
      countries: this.countries
    }).subscribe(page => {
      this.nuggets.push(...page.nuggets);

      // Alert subscribers of the new nuggets.
      this.nuggetsSubscribers.forEach(subscriber => {
        subscriber({
          nuggets: this.nuggets,
          isMore: page.pageIndex + 1 < page.totalPages
        });
      })
    });
  }

  getNugget(id: string) {
    return this.nuggetProvider.getNugget(id);
  }

  getCountries() {
    return this.countries;
  }

  setCountries(countries: string[]) {
    console.log(countries);
    if (!countries)
      countries = [];
    this.countries = countries;
    this.reset();
  }

  private reset() {
    this.nuggets = [];
    this.nextPage = 0;
    this.loadMore();
  }
}
