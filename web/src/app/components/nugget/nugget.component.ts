import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NuggetService } from '../../core/service/nugget.service';
import { Nugget } from '../../core/model/Nugget.model';
import { GalleryComponent } from '../gallery/gallery.component';

@Component({
  selector: 'app-nugget',
  templateUrl: './nugget.component.html',
  styleUrls: ['./nugget.component.scss']
})
export class NuggetComponent implements OnInit {

  /**
   * The current nugget being displayed.
   */
  nugget?: Nugget;

  /**
   * The gallery displaying all the current nugget's images.
   */
  private gallery?: GalleryComponent;
  @ViewChild(GalleryComponent, { static: false }) 
  set setGallery(gallery: GalleryComponent) {
    this.gallery = gallery;
    this.offsetMetadata();
  }

  metadata: ElementRef
  @ViewChild('metadata', { static: false }) set setMetadata(e:ElementRef) {
    if (!e)
      return;
    this.metadata = e;
    this.offsetMetadata();
  };

  private offsetMetadata() {
    if (!this.gallery || !this.metadata)
      return;
    this.gallery.setHeight(this.gallery.getHeight() - this.metadata.nativeElement.offsetHeight);
  }

  constructor(
    private route: ActivatedRoute,
    private nuggetService: NuggetService
  ) { }

  ngOnInit() {
    var id = this.route.params['id'];
    if (!id) {
      id = "0";
    }
    this.nuggetService.getNugget(id).subscribe(nugget => this.nugget = nugget);
  }
}
