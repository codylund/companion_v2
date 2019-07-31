import { Component, OnInit, Input, Output, EventEmitter, ElementRef } from '@angular/core';
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

  constructor(private el: ElementRef) { }

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
}
