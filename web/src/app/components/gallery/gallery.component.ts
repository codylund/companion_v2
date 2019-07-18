import { Component, OnInit, Input, ElementRef, Renderer2 } from '@angular/core';
import { Photo } from 'src/app/core/model/Photo.model';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryImageSize, NgxGalleryAnimation } from 'ngx-gallery';

/**
 * Displays photos in an interactive gallery.
 */
@Component({
  selector: 'app-gallery',
  template: '<ngx-gallery [options]="galleryOptions" [images]="galleryImages"></ngx-gallery>',
})
export class GalleryComponent implements OnInit {

  /**
   * Photos to display in the gallery.
   */
  @Input()
  photos: Photo[]

  /**
   * Gallery options. Consumed by NgxGallery.
   */
  galleryOptions: NgxGalleryOptions[] = [
    {
      // Fill the entire container.
      width: "100%",
      height: "100%",
      // Don't show thumbnails.
      thumbnails: false,
      // Slide on nav.
      imageAnimation: NgxGalleryAnimation.Slide,
      // Fill the entire gallery stage. No letterboxes.
      imageSize: NgxGalleryImageSize.Cover,
    }
  ];

  /**
   * Gallery images. Consumed by NgxGallery.
   */
  galleryImages: NgxGalleryImage[] = [];

  constructor(private renderer: Renderer2, private el:ElementRef){    
  }

  ngOnInit() {
    // Convert the input images to NgxGallery compatible objects.
    this.galleryImages = [];
    for (var photo of this.photos) {
      this.galleryImages.push({
        // Default version. Shown embedded in the webpage.
        medium: photo.url,
        // Fullscreen version. Shown when an image is clicked.
        big: photo.url
      });
    }
  }

  /**
   * @returns the height of the gallery in pixels.
   */
  getHeight(): number {
    return (!this.el) ? 0 : this.el.nativeElement.offsetHeight;
  }

  /**
   * Set the height of the gallery in pixels.
   * @param height 
   *    Height in pixels.
   */
  setHeight(height: number) {
    if (!this.el)
      return;
    this.renderer.setStyle(this.el.nativeElement, "height", height + "px");
  }
}
