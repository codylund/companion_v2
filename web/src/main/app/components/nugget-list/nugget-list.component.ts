import { Component, OnInit } from '@angular/core';
import { Nugget } from '../../../shared/model';
import { NuggetService } from 'src/main/app/core/service/nugget.service';
import { NuggetQueryType } from 'src/main/app/core/service/NuggetQueryType';
import { DomSanitizer } from '@angular/platform-browser';
import { MetadataConfig } from '../metadata/metadata.config';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-nugget-list',
  templateUrl: './nugget-list.component.html',
  styleUrls: ['./nugget-list.component.scss']
})
export class NuggetListComponent implements OnInit {

  private nuggetPageIndex = 0;
  nuggets: Nugget[] = [];

  isLoading = true;
  isMore = false;

  metadataConfig = new MetadataConfig();

  constructor(
    private route: ActivatedRoute,
    private nuggetService: NuggetService, 
    private domSanitizer: DomSanitizer
  ){ 
    this.metadataConfig.showTags = false;
  }

  ngOnInit() {
    this.loadNextPage();
  }
  
  loadNextPage() {
    console.log(`Loading page ${ this.nuggetPageIndex }`);

    // We are loading a page of nuggets.
    this.isLoading = true;

    // We don't know if there are more pages yet.
    this.isMore = false;

    // Request the next nugget page.
    this.nuggetService.getNuggetPage(NuggetQueryType.ByNew, this.nuggetPageIndex)
      .subscribe(nuggetPage => {
        console.log(nuggetPage.toString());

        nuggetPage.nuggets.forEach((nugget) => {
          this.nuggets.push(nugget);
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
    return this.domSanitizer.bypassSecurityTrustStyle('url(' + url + ')');
  }
}
