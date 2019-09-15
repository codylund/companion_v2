import { Component, OnInit } from '@angular/core';
import { Nugget } from '../../../shared/model';
import { NuggetService } from '../../core/service/nugget.service';
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
    this.pageMetadataService.post(PageMetadatas.places)

    this.nuggetService.getNugget('teotihuacan').subscribe(nugget => this.highlight = nugget)

    // Observe the currently loaded nuggets.
    this.nuggetService.observeCurrentNuggets().subscribe((loadedNuggets) => {
      this.nuggets = loadedNuggets.nuggets;
      this.isMore = loadedNuggets.isMore;
      this.isLoading = false;
    });

    // Load the first page.
    this.loadNextPage();
  }
  
  loadNextPage() {
    // We are loading a page of nuggets.
    this.isLoading = true;
    // We don't know if there are more pages yet.
    this.isMore = false;

    this.nuggetService.loadMore()
  }

  getSanitizedUrl(url: string) {
    return this.domSanitizer.bypassSecurityTrustStyle(`url('${url}')`);
  }
}
