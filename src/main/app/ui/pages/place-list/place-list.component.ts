import { Component, OnInit } from '@angular/core';
import { Place } from '../../../../shared/model';
import { PlaceService } from '../../../core/service/place.service';
import { DomSanitizer } from '@angular/platform-browser';
import { PageMetadataService } from '../../../core/service/page-metadata.service';
import { PageMetadatas } from '../../../core/site/PageMetadatas';

@Component({
  selector: 'app-place-list',
  templateUrl: './place-list.component.html',
  styleUrls: ['./place-list.component.scss']
})
export class PlaceListComponent implements OnInit {

  /**
   * The other places.
   */
  places: Place[] = [];

  isLoading = true;
  isMore = false;

  constructor(
    private placeService: PlaceService, 
    private domSanitizer: DomSanitizer,
    private pageMetadataService: PageMetadataService
  ){ 
  }

  ngOnInit() {
    this.pageMetadataService.post(PageMetadatas.places);

    // Observe the currently loaded places.
    this.placeService.observeCurrentPlaces().subscribe((loadedPlaces) => {
      this.places = loadedPlaces.places;
      this.isMore = loadedPlaces.isMore;
      this.isLoading = false;
    });

    // Load the first page.
    this.loadNextPage();
  }
  
  loadNextPage() {
    // We are loading a page of places.
    this.isLoading = true;
    // We don't know if there are more pages yet.
    this.isMore = false;

    this.placeService.loadMore()
  }

  getSanitizedUrl(url: string) {
    return this.domSanitizer.bypassSecurityTrustStyle(`url('${url}')`);
  }
}
