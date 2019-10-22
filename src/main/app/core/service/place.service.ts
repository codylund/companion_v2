import { Injectable } from '@angular/core';
import { Place } from '../../../shared/model';
import { Observable, Subscription } from 'rxjs';
import { LoadedPlaces } from '../site/LoadedPlaces';
import { take, map } from 'rxjs/operators';
import { PlacePage } from 'src/main/shared/model/PlacePage';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { PlaceFilters } from '../site/PlaceFilters';

@Injectable({
  providedIn: 'root'
})
export class PlaceService {

  private places: Place[] = []

  private countries: string[] = [];

  private placesSubscribers: ((places: LoadedPlaces) => any)[] = [] 

  private pendingRequests: Subscription[] = [];

  /**
   * Observable for watching places to display.
   */
  private placesObservable = new Observable<LoadedPlaces>((observer)=>{
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

  observeCurrentPlaces(): Observable<LoadedPlaces> {
    return this.placesObservable;
  }

  /**
   * Asynchronously load more places.
   */
  loadMore() {
    var subscription = this.getLatest(this.nextPage++, {
      countries: this.countries
    }).pipe(take(1))
    .subscribe(page => {
      this.places.push(...page.places);

      // Alert subscribers of the new places.
      this.placesSubscribers.forEach(subscriber => {
        subscriber({
          places: this.places,
          isMore: page.pageIndex + 1 < page.totalPages
        });
      })
    });

    // Track the request so we can cancel it if needed.
    this.pendingRequests.push(subscription);
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

  getLatest(pageIndex: number, filters: PlaceFilters): Observable<PlacePage>  {
      return this.http.post(`${ environment.handlerEndpoint }/api/latest?page=${ pageIndex }`, {
          countries: filters.countries
      }).pipe(map(res => new PlacePage(res)));
  }

  private reset() {
    this.pendingRequests.forEach(req => req.unsubscribe());
    this.pendingRequests = [];
    this.countries = [];
    this.places = [];
    this.nextPage = 0;
  }
}
