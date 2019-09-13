import { Component, OnInit } from '@angular/core';
import { Nugget } from '../../../shared/model';
import { NuggetService } from '../../core/service/nugget.service';
import { NuggetQueryType } from '../../core/service/NuggetQueryType';
import { DomSanitizer } from '@angular/platform-browser';
import { PageMetadataService } from '../../core/service/page-metadata.service';
import { PageMetadatas } from '../../core/site/PageMetadatas';

@Component({
  selector: 'app-nugget-list',
  templateUrl: './nugget-list.component.html',
  styleUrls: ['./nugget-list.component.scss']
})
export class NuggetListComponent implements OnInit {

  private nuggetPageIndex = 0;

  /**
   * The featured place.
   */
  highlight: Nugget;

  /**
   * The other places.
   */
  nuggets: Nugget[] = [];

  isLoading = true;
  isMore = false;

  constructor(
    private nuggetService: NuggetService, 
    private domSanitizer: DomSanitizer,
    private pageMetadataService: PageMetadataService
  ){ 
  }

  ngOnInit() {
    this.loadNextPage();
    this.pageMetadataService.post(PageMetadatas.places)
  }
  
  loadNextPage() {
    // We are loading a page of nuggets.
    this.isLoading = true;

    // We don't know if there are more pages yet.
    this.isMore = false;

    // Request the next nugget page.
    this.nuggetService.getNuggetPage(NuggetQueryType.ByNew, this.nuggetPageIndex)
      .subscribe(nuggetPage => {
        // Init vars with the appropriate nuggets.
        nuggetPage.nuggets.forEach((nugget, idx) => {
          if (idx == 0) {
            this.highlight = nugget
          } else {
            this.nuggets.push(nugget);
          }
        });

        // We aren't loading more nuggets at the moment.
        this.isLoading = false;

        // Check if there are yet more nuggets to load.
        this.isMore = nuggetPage.pageIndex < nuggetPage.totalPages - 1;

        // Next time, load the next nugget.
        this.nuggetPageIndex = nuggetPage.pageIndex + 1;
      });
  }

  getSanitizedUrl(url: string) {
    return this.domSanitizer.bypassSecurityTrustStyle(`url('${url}')`);
  }
}
