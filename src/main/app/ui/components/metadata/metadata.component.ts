import { Component, OnInit, Input } from '@angular/core';
import { PlaceMetadata } from '../../../../shared/model';

@Component({
  selector: 'app-metadata',
  templateUrl: './metadata.component.html',
  styleUrls: ['./metadata.component.scss'],
})
export class MetadataComponent implements OnInit {

  @Input() metadata: PlaceMetadata;

  constructor(
  ) { }

  ngOnInit() {
  }
}
