import { Component, OnInit, Input, ElementRef, Renderer2 } from '@angular/core';
import { Photo } from 'src/main/shared/model';

@Component({
  selector: 'app-gallery-fs',
  templateUrl: './gallery-fs.component.html',
  styleUrls: ['./gallery-fs.component.scss']
})
export class GalleryFsComponent implements OnInit {

  @Input() photos: Photo[];

  private fullscreenPhoto?: Photo;
  private enabled = false;

  constructor(
    private renderer: Renderer2,
    private el: ElementRef
    ) { }

  ngOnInit() {
  }

  setFullscreenPhoto(photo: Photo) {
    if (!this.enabled) {
      return;
    }
    console.log("Showing fullscreen photo: " + photo.toString())
    this.fullscreenPhoto = photo;
    this.setScrollable(false);
  }

  getFullscreenPhoto() {
    return this.fullscreenPhoto;
  }

  private setScrollable(scrollable: boolean) {
    this.renderer.setStyle(document.body, "overflow", scrollable ? "inherit" : "hidden");
  }

  hideFullscreenPhoto() {
    this.fullscreenPhoto = null;
    this.setScrollable(true);
  }
}
