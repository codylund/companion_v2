import { Component, OnInit, Input } from '@angular/core';
import { NuggetMetadata } from '../../../shared/model';

@Component({
  selector: 'app-metadata',
  templateUrl: './metadata.component.html',
  styleUrls: ['./metadata.component.scss'],
})
export class MetadataComponent implements OnInit {

  @Input() metadata: NuggetMetadata;

  constructor(
  ) { }

  ngOnInit() {
  }
}
