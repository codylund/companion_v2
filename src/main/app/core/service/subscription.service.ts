import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {

  constructor(
    private http: HttpClient
  ) { }

  subscribeEmail(email: String) {
    return this.http.post(`${environment.handlerEndpoint}/api/subscribe`, {
      email: email
    }).subscribe();
  }
}
