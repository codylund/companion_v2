import { Component, OnInit } from '@angular/core';
import { Nugget } from 'shared/lib/model';
import { NuggetService } from 'src/app/core/service/nugget.service';
import { NuggetQueryType } from 'src/app/core/service/NuggetQueryType';
import { DomSanitizer } from '@angular/platform-browser';
import { MetadataConfig } from '../metadata/metadata.config';

@Component({
  selector: 'app-nugget-list',
  templateUrl: './nugget-list.component.html',
  styleUrls: ['./nugget-list.component.scss']
})
export class NuggetListComponent implements OnInit {

  nuggets: Nugget[] = [];

  metadataConfig: MetadataConfig;

  constructor(private nuggetService: NuggetService, private domSanitizer: DomSanitizer) { 
    this.metadataConfig = new MetadataConfig();
    this.metadataConfig.showLocation = true;
    this.metadataConfig.showActivities = false;
    this.metadataConfig.showDate = true;
    this.metadataConfig.showTags = false;

    this.metadataConfig.titleFontSizePt = 16;
    this.metadataConfig.locationFontSizePt =  10;
    this.metadataConfig.dateFontSizePt = 10;
  }

  ngOnInit() {
    this.nuggetService.getNuggetPage(NuggetQueryType.ByNew, 0).forEach(element => {
      element.subscribe(nugget => this.nuggets.push(nugget));
    });
  }
  
  getSanitizedUrl(url: string) {
    return this.domSanitizer.bypassSecurityTrustStyle('url(' + url + ')');
  }
}
