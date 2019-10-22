import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Photo } from 'src/main/shared/model';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FlickrService {

  constructor(
    private http: HttpClient
  ) { }

  getPhotos(albumId: string): Observable<Photo[]> {
    return this.http.get(`${environment.handlerEndpoint}/api/getFlickrAlbum?albumId=${albumId}`)
      .pipe(map(res => <Photo[]>res));
  }

}
