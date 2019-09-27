import { Component, OnInit } from '@angular/core';
import { Nugget } from 'src/main/shared/model';

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

  photo: string;
  photos: string[] = [];

  nugget: Nugget;

  constructor() { }

  ngOnInit() {
  }

  saveTag() {
    if (!this.tag || this.tag.length <= 0)
      return;
    
    this.tags.push(this.tag);
    this.tag = null;
  }

  savePhoto() {
    if (!this.photo || this.photo.length <= 0)
      return;
    
    this.photos.push(this.photo);
    this.photo = null;
  }

  preview() {
    this.nugget = new Nugget({
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
        photos: this.photos.map((photo) => {
          return { url: photo };
        })
      }
    });
  }
}
