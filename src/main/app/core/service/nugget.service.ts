import { Injectable } from '@angular/core';
import { Nugget } from '../../../shared/model';
import { NuggetProviderFactory } from '../provider/NuggetProviderFactory';
import { NuggetProvider } from '../provider/NuggetProvider';
import { Observable, Subscription } from 'rxjs';
import { LoadedNuggets } from '../site/LoadedNuggets';
import { count, take } from 'rxjs/operators';
import { NuggetPage } from 'src/main/shared/model/NuggetPage';

@Injectable({
  providedIn: 'root'
})
export class NuggetService {

  private nuggetProvider: NuggetProvider;

  private nuggets: Nugget[] = []

  private countries: string[] = [];

  private nuggetsSubscribers: ((nuggets: LoadedNuggets) => any)[] = [] 

  private pendingRequests: Subscription[] = [];

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
    var subscription = this.nuggetProvider.getLatest(this.nextPage++, {
      countries: this.countries
    }).pipe(take(1))
    .subscribe(page => {
      this.nuggets.push(...page.nuggets);

      // Alert subscribers of the new nuggets.
      this.nuggetsSubscribers.forEach(subscriber => {
        subscriber({
          nuggets: this.nuggets,
          isMore: page.pageIndex + 1 < page.totalPages
        });
      })
    });

    // Track the request so we can cancel it if needed.
    this.pendingRequests.push(subscription);
  }

  getRandomNugget() {
    return this.nuggetProvider.getRandom();
  }

  getNugget(id: string) {
    return this.nuggetProvider.getNugget(id);
  }

  getCountries() {
    return this.countries;
  }

  setCountries(countries: string[]) {
    this.reset();

    if (countries)
      this.countries = countries;

    this.loadMore();
  }

  private reset() {
    this.pendingRequests.forEach(req => req.unsubscribe());
    this.pendingRequests = [];
    this.countries = [];
    this.nuggets = [];
    this.nextPage = 0;
  }
}
