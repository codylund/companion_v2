import { Component, OnInit } from '@angular/core';
import { Place, Photo } from 'src/main/shared/model';
import { FlickrService } from '../../core/service/flickr.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-new-place',
  templateUrl: './new-place.component.html',
  styleUrls: ['./new-place.component.scss']
})
export class NewPlaceComponent implements OnInit {

  id: string;

  title: string;

  date: string;

  city: string;
  state: string;
  country: string;

  mapsUrl: string;

  tag: string;
  tags: string[] = [];

  synopsis: string;

  albumId: string;
  photos: Photo[] = [];

  place: Place;

  constructor(
    private flickrService: FlickrService
  ) { }

  ngOnInit() {
  }

  saveTag() {
    if (!this.tag || this.tag.length <= 0)
      return;
    
    this.tags.push(this.tag);
    this.tag = null;
  }

  loadAlbum() {
    if (!this.albumId || this.albumId.length <= 0)
      return;
    
    this.flickrService.getPhotos(this.albumId).subscribe(photos => {
      this.photos = photos;
    })
  }

  dropPic(event: CdkDragDrop<Photo[]>) {
    moveItemInArray(this.photos, event.previousIndex, event.currentIndex);
  }

  preview() {
    this.place = new Place({
      metadata: {
        id: this.id,
        title: this.title,
        date: new Date(this.date),
        location: {
          city: this.city,
          state: this.state,
          country: this.country,
          url: this.mapsUrl
        },
        tags: this.tags
      },
      content: {
        body: "",
        synopsis: this.synopsis,
        photos: this.photos
      }
    });
  }
}
