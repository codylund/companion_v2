import { NuggetProvider } from './NuggetProvider';
import { isDevMode, Injectable } from '@angular/core';
import { NuggetProviderImpl } from './NuggetProviderImpl';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class NuggetProviderFactory {

    constructor(
        private http: HttpClient
    ) { }

    getInstance(): NuggetProvider {
        if (isDevMode()) {
            return new NuggetProviderImpl(this.http, "http://localhost", 8080);
        } else {
            // TODO update this with the appropriate url and port.
            return new NuggetProviderImpl(this.http, "https://codylund.heroku.com");
        }
    }
}