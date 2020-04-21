import { Component, OnInit, ElementRef } from '@angular/core';
import { Place } from 'src/main/shared/model';
import { PlaceService } from '../../../core/service/place.service';
import { DomSanitizer } from '@angular/platform-browser';
import { PageMetadataService } from '../../../core/service/page-metadata.service';
import { PageMetadatas } from '../../../core/site/PageMetadatas';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  /**
   * The featured place.
   */
  highlight: Place;

  constructor(
    private placeService: PlaceService, 
    private domSanitizer: DomSanitizer,
    private pageMetadataService: PageMetadataService
  ) { }

  ngOnInit() {
    this.pageMetadataService.post(PageMetadatas.default);
    this.placeService.getPlace("plum-island").subscribe(place => this.highlight = place);
  }

  getSanitizedUrl(url: string) {
    return this.domSanitizer.bypassSecurityTrustStyle(`url('${url}')`);
  }
}
