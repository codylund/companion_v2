import { Component, OnInit } from '@angular/core';
import { InstagramService } from '../../core/service/instagram.service';
import { InstagramHighlight } from 'src/main/shared/model/instagram/InstagramHighlight';
import { InstagramMedia } from 'src/main/shared/model/instagram/InstagramMedia';
import { InstagramMediaType } from 'src/main/shared/model/instagram/InstramMediaType';

@Component({
  selector: 'app-instagram-highlight',
  templateUrl: './instagram-highlight.component.html',
  styleUrls: ['./instagram-highlight.component.scss']
})
export class InstagramHighlightComponent implements OnInit {

  highlight: InstagramHighlight;

  media: InstagramMedia;

  current = 0;

  private timeout: NodeJS.Timer;

  constructor(
    private instagramService: InstagramService
  ) { }

  ngOnInit() {
    this.instagramService.getLatest().subscribe(highlight => {
      this.highlight = highlight
      this.updateCurrentMedia();
    });
  }

  next() {    
    clearTimeout(this.timeout);
    this.current = (this.current + 1) % this.highlight.medias.length;
    this.updateCurrentMedia();
  }

  last() {
    clearTimeout(this.timeout);
    this.current = (this.current + this.highlight.medias.length - 1) % this.highlight.medias.length;
    this.updateCurrentMedia();
  }

  private updateCurrentMedia() {
    this.media = this.highlight.medias[this.current];
    if (this.media.type == InstagramMediaType.Photo) {
      this.timeout = setTimeout(() => this.next(), 7000);
    }
  }
}
