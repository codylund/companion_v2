import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NuggetService } from '../../core/service/nugget.service';
import { Nugget } from 'shared/lib/model';
import { GalleryComponent } from '../gallery/gallery.component';
import { MetadataComponent } from '../metadata/metadata.component';
import { DomSanitizer } from '@angular/platform-browser';

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
    if (!gallery)
      return;
    this.gallery = gallery;
    this.offsetMetadata();
  }

  /**
   * The current nugget's metadata.
   */
  private metadata?: MetadataComponent;
  @ViewChild(MetadataComponent, { static: false })
  set setMetadata(metadata: MetadataComponent) {
    if (!metadata)
      return;
    this.metadata = metadata;
    this.offsetMetadata();
  };

  private offsetMetadata() {
    if (!this.gallery || !this.metadata)
      return;
    console.log(this.gallery.getHeight());
    this.gallery.setHeight(this.gallery.getHeight() - this.metadata.getHeight());
  }

  constructor(
    private route: ActivatedRoute,
    private nuggetService: NuggetService,
    private domSanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap) => {
      // Get the requested nugget id from the parameter map.
      var id = paramMap.get('id');
      if (!id) {
        console.error("No ID was specified. This should never happen.");
        id = '0';
      }
      // Request the nugget from the server.
      this.nuggetService.getNugget(id).subscribe(nugget => {
        console.log(`Received nugget: ${ JSON.stringify(nugget) }`)
        this.nugget = nugget;
      });
    });
  }

  getContentHtml() {
    return this.domSanitizer.bypassSecurityTrustHtml(this.nugget.content.body);
  }
}
