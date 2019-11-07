import { Injectable } from '@angular/core';
import { Place } from '../../../shared/model';
import { Observable } from 'rxjs';
import { LoadedPlaces } from '../site/LoadedPlaces';
import { take, map, isEmpty } from 'rxjs/operators';
import { PlacePage } from 'src/main/shared/model/PlacePage';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { PlaceFilters } from '../site/PlaceFilters';

@Injectable({
  providedIn: 'root'
})
export class PlaceService {

  private isInitialized = false;

  private places: Place[] = [];
  private isMore: boolean = true;

  private countries: string[] = [];

  private placesSubscribers: ((places: LoadedPlaces) => any)[] = [] 

  private placesRequestQueue = new CancelableQueue();

  /**
   * Observable for watching places to display.
   */
  private placesObservable = new Observable<LoadedPlaces>((observer)=>{
    // Let the new subscriber know about any places we have
    // have already loaded.
    if (this.places.length > 0) {
      observer.next({
        places: this.places,
        isMore: this.isMore
      });
    }

    // Handler passing the observer more places.
    const handler = (places: LoadedPlaces) => observer.next(places);
    
    // Track the handler.
    this.placesSubscribers.push(handler);

    // Return function to unsubscribe.
    return () => {
      var index = this.placesSubscribers.indexOf(handler)
      this.placesSubscribers = this.placesSubscribers.splice(index, 1);
    }
  });

  /**
   * The next page to load.
   */
  private nextPage = 0;

  constructor(
    private http: HttpClient
  ) { }

  init() {
    if (this.isInitialized)
      return;
    this.isInitialized = true;

    this.loadMore();
  }

  observeCurrentPlaces(): Observable<LoadedPlaces> {
    return this.placesObservable;
  }

  /**
   * Asynchronously load more places.
   */
  loadMore() {
    if (!this.isMore) {
      // No more places to load.
      return;
    }

    // Queue task to load the next page.
    this.placesRequestQueue.then(() => {
      // Get the next page.
      this.getLatestPage(this.nextPage++, {
        countries: this.countries
      }).pipe(take(1))
      .subscribe(page => {
        // Add the new places to the loaded list.
        this.places.push(...page.places);
  
        // Check if we have more places to load
        this.isMore = page.pageIndex + 1 < page.totalPages;

        // Alert subscribers of the new places.
        this.notifyCurrentPlacesSubscribers();
      });
    })
  }

  private notifyCurrentPlacesSubscribers() {
    this.placesSubscribers.forEach(subscriber => {
      subscriber({
        places: this.places,
        isMore: this.isMore
      });
    });
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

  getPlace(id: string) {
    return this.http.get(`${ environment.handlerEndpoint }/api/places/${ id }`)
        .pipe(map(res => new Place(res)));
  }

  private getLatestPage(pageIndex: number, filters: PlaceFilters): Observable<PlacePage>  {
      return this.http.post(`${ environment.handlerEndpoint }/api/latest?page=${ pageIndex }`, {
          countries: filters.countries
      }).pipe(map(res => new PlacePage(res)));
  }

  private reset() {    
    // Cancel the current place request queue and get a new one.
    this.placesRequestQueue.cancel();
    this.placesRequestQueue = new CancelableQueue();

    // Reset the tracking variables.
    this.places = [];
    this.countries = [];
    this.nextPage = 0;
    this.isMore = true;
  }
}

/**
 * A task queue that can be cancelled.
 */
class CancelableQueue {
  private promise = Promise.resolve();
  
  private isCancelled: boolean = false;

  /**
   * Cancel all pending and future tasks.
   */
  cancel() {
    this.isCancelled = true;
  }

  /**
   * Schedules a new task.
   * @param task 
   *    The task to do.
   */
  then(task: () => void) {
    this.promise.then(() => {
      if (this.isCancelled) {
        // The queue is cancelled so don't do the task.
        return;
      }

      // Do the task;
      task();
    });
  }
}