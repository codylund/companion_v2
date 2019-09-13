import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NuggetService } from '../../core/service/nugget.service';
import { Nugget } from '../../../shared/model';
import { DomSanitizer } from '@angular/platform-browser';
import { PageMetadataService } from '../../core/service/page-metadata.service';
import { PageMetadatas } from '../../core/site/PageMetadatas';

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

  constructor(
    private route: ActivatedRoute,
    private nuggetService: NuggetService,
    private domSanitizer: DomSanitizer,
    private pageMetadataService: PageMetadataService
  ) { }

  ngOnInit() {
    // Set the initial title.
    this.pageMetadataService.post(PageMetadatas.default);

    // Get the route parameters.
    this.route.paramMap.subscribe((paramMap) => {
      // Get the requested nugget id from the parameter map.
      var id = paramMap.get('id');

      // Request the nugget from the server.
      this.nuggetService.getNugget(id).subscribe(nugget => {
        this.nugget = nugget;
        this.pageMetadataService.post(PageMetadatas.forPlace(this.nugget.metadata));
      });
    });
  }

  getContentHtml() {
    return this.domSanitizer.bypassSecurityTrustHtml(this.nugget.content.body);
  }
}
