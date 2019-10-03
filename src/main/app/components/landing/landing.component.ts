import { Component, OnInit } from '@angular/core';
import { Nugget } from 'src/main/shared/model';
import { NuggetService } from '../../core/service/nugget.service';
import { DomSanitizer } from '@angular/platform-browser';
import { PageMetadataService } from '../../core/service/page-metadata.service';
import { PageMetadatas } from '../../core/site/PageMetadatas';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  /**
   * The featured place.
   */
  highlight: Nugget;

  constructor(
    private nuggetService: NuggetService, 
    private domSanitizer: DomSanitizer,
    private pageMetadataService: PageMetadataService
  ) { }

  ngOnInit() {
    this.pageMetadataService.post(PageMetadatas.default)
    this.nuggetService.getNugget('kinsman-ridge').subscribe(nugget => this.highlight = nugget)
  }

  getSanitizedUrl(url: string) {
    return this.domSanitizer.bypassSecurityTrustStyle(`url('${url}')`);
  }
}
