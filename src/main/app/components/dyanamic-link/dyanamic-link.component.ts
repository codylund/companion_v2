import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-dyanamic-link',
  template: `
    <link rel="prefetch" as="video" [attr.href]="getSanitizedUrl(url)">
  `
})
export class DyanamicLinkComponent implements OnInit {

  @Input() url: String;

  constructor(
    private domSanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    console.log(this.url);
  }

  getSanitizedUrl(url: string) {
    console.log(url);
    return this.domSanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
