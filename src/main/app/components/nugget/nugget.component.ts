import { Component, OnInit, Input } from '@angular/core';
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
  @Input() nugget: Nugget;

  constructor(
    private route: ActivatedRoute,
    private nuggetService: NuggetService,
    private domSanitizer: DomSanitizer,
    private pageMetadataService: PageMetadataService
  ) { 
    this.onNuggetLoad = this.onNuggetLoad.bind(this);
  }

  ngOnInit() {
    // Set the initial title.
    this.pageMetadataService.post(PageMetadatas.default);
    console.log(this.pageMetadataService);

    if (this.nugget) {
      this.onNuggetLoad(this.nugget);
    } else {
      // Get the route parameters.
      this.route.paramMap.subscribe((paramMap) => {
        // Get the requested nugget id from the parameter map.
        var id = paramMap.get('id');
        if (!id)
          return;

        // Request the nugget from the server.
        this.nuggetService.getNugget(id).subscribe(this.onNuggetLoad);
      });
    }
  }

  onNuggetLoad(nugget: Nugget) {
    if (nugget == null)
      return;
    this.nugget = nugget;
    console.log(this.pageMetadataService);
    this.pageMetadataService.post(PageMetadatas.forPlace(this.nugget.metadata));
  }

  getContentHtml() {
    return this.domSanitizer.bypassSecurityTrustHtml(this.nugget.content.body);
  }
}
