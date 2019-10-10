import { Component, OnInit, Input } from '@angular/core';
import { Photo } from 'src/main/shared/model';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {

  @Input() photos: Photo[];

  constructor() { }

  ngOnInit() { }
}
