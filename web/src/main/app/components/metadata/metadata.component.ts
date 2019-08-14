import { Component, OnInit, Input, Output, EventEmitter, ElementRef } from '@angular/core';
import { Location } from '@angular/common'
import { NuggetMetadata } from '../../../shared/model';
import { MetadataConfig } from './metadata.config';

@Component({
  selector: 'app-metadata',
  templateUrl: './metadata.component.html',
  styleUrls: ['./metadata.component.scss']
})
export class MetadataComponent implements OnInit {

  @Input() metadata: NuggetMetadata;

  @Input() config: MetadataConfig = new MetadataConfig();

  constructor(
    private el: ElementRef,
    private location: Location
  ) { }

  ngOnInit() {
  }

  /**
   * @returns the height of the gallery in pixels.
   */
  getHeight(): number {
    return (!this.el) ? 0 : this.el.nativeElement.offsetHeight;
  }

  setConfig(config: MetadataConfig) {
    this.config = config
    console.log(this.config.showActivities)
  }

  goBack() {
    this.location.back();
  }
}
