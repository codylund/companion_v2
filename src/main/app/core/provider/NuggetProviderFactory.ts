import { NuggetProvider } from './NuggetProvider';
import { Injectable } from '@angular/core';
import { NuggetProviderImpl } from './NuggetProviderImpl';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment'

@Injectable({
    providedIn: 'root'
})
export class NuggetProviderFactory {

    constructor(
        private http: HttpClient
    ) { }

    getInstance(): NuggetProvider {
        return new NuggetProviderImpl(this.http, environment.handlerEndpoint);
    }
}