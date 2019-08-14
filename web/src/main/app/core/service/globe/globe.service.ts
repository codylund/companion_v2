import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as d3 from 'd3';

@Injectable({
  providedIn: 'root'
})
export class GlobeService {

  constructor(
    private httpClient: HttpClient
  ) { }

  ngOnInit() {
    this.loadJson();
  }

  loadJson() {
    return this.httpClient.get('https://gist.githubusercontent.com/d3indepth/f28e1c3a99ea6d84986f35ac8646fac7/raw/c58cede8dab4673c91a3db702d50f7447b373d98/ne_110m_land.json');
  }
}
