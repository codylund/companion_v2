import { Component, OnInit, ViewChild, ElementRef, Input, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NuggetService } from '../../core/service/nugget.service';
import { Nugget } from '../../../shared/model';
import { DomSanitizer } from '@angular/platform-browser';
import { MetadataConfig } from '../metadata/metadata.config';

@Component({
  selector: 'app-nugget',
  templateUrl: './nugget.component.html',
  styleUrls: ['./nugget.component.scss']
})
export class NuggetComponent implements OnInit {

  /**
   * The current nugget being displayed.
   */
  nugget?: Nugget;

  metadataConfig =  new MetadataConfig();

  constructor(
    private route: ActivatedRoute,
    private nuggetService: NuggetService,
    private domSanitizer: DomSanitizer
  ) { 
    this.metadataConfig.titleFontSizePt = 28;
    this.metadataConfig.locationFontSizePt = 14;
    this.metadataConfig.dateFontSizePt = 12;
  }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap) => {
      // Get the requested nugget id from the parameter map.
      var id = paramMap.get('id');
      if (!id) {
        console.error("No ID was specified. This should never happen.");
        id = '0';
      }

      // Request the nugget from the server.
      this.nuggetService.getNugget(id).subscribe(nugget => {
        console.log(`Received nugget: ${ JSON.stringify(nugget) }`)
        this.nugget = nugget;
      });
    });
  }

  getContentHtml() {
    return this.domSanitizer.bypassSecurityTrustHtml(this.nugget.content.body);
  }
}
