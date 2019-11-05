import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { InstagramHighlight } from 'src/main/shared/model/instagram/InstagramHighlight';

@Injectable({
  providedIn: 'root'
})
export class InstagramService {

  constructor(
    private http: HttpClient
  ) { }

  getLatest(): Observable<InstagramHighlight> {
    return this.http.get(`${environment.handlerEndpoint}/api/highlights`)
      .pipe(map(res => <InstagramHighlight>res));
  }
}
