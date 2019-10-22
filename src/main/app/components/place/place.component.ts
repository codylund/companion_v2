import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlaceService } from '../../core/service/place.service';
import { Place } from '../../../shared/model';
import { DomSanitizer } from '@angular/platform-browser';
import { PageMetadataService } from '../../core/service/page-metadata.service';
import { PageMetadatas } from '../../core/site/PageMetadatas';

@Component({
  selector: 'app-place',
  templateUrl: './place.component.html',
  styleUrls: ['./place.component.scss']
})
export class PlaceComponent implements OnInit {

  /**
   * The current place being displayed.
   */
  @Input() place: Place;

  constructor(
    private route: ActivatedRoute,
    private placeService: PlaceService,
    private domSanitizer: DomSanitizer,
    private pageMetadataService: PageMetadataService
  ) { 
    this.onPlaceLoad = this.onPlaceLoad.bind(this);
  }

  ngOnInit() {
    // Set the initial title.
    this.pageMetadataService.post(PageMetadatas.default);
    console.log(this.pageMetadataService);

    if (this.place) {
      this.onPlaceLoad(this.place);
    } else {
      // Get the route parameters.
      this.route.paramMap.subscribe((paramMap) => {
        // Get the requested place id from the parameter map.
        var id = paramMap.get('id');
        if (!id)
          return;

        // Request the place from the server.
        this.placeService.getPlace(id).subscribe(this.onPlaceLoad);
      });
    }
  }

  onPlaceLoad(place: Place) {
    if (place == null)
      return;
    this.place = place;
    console.log(this.pageMetadataService);
    this.pageMetadataService.post(PageMetadatas.forPlace(this.place.metadata));
  }

  getContentHtml() {
    return this.domSanitizer.bypassSecurityTrustHtml(this.place.content.body);
  }
}
