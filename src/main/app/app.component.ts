import { Component } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { PageMetadataService } from './core/service/page-metadata.service';

declare let ga: Function;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    router: Router,
    metadataService: PageMetadataService,
    title: Title
  ) {
    metadataService.subscribe(pageMetadata => {
      title.setTitle(pageMetadata.title);
    })
    
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.logNavigationToTelemetry(event);
      }
    });
  }

  private logNavigationToTelemetry(event: NavigationEnd) {
    ga('set', 'page', event.urlAfterRedirects);
    ga('send', 'pageview');
  }
}
