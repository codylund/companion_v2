import { Injectable } from '@angular/core';
import { PageMetadata } from '../site/PageMetadata';

type Callback = (nuggetMetadata: PageMetadata) => any;

@Injectable({
  providedIn: 'root'
})
export class PageMetadataService {

  private observers: Callback[] = [];

  constructor() { }

  post(metadata: PageMetadata) {
    this.observers.forEach((observer) => observer(metadata));
  }

  subscribe(observer: Callback) {
    this.observers.push(observer);
  }
}
