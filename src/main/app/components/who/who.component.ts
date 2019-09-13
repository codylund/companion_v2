import { Component, OnInit } from '@angular/core';
import { PageMetadataService } from '../../core/service/page-metadata.service';
import { PageMetadatas } from '../../core/site/PageMetadatas';

@Component({
  selector: 'app-who',
  templateUrl: './who.component.html',
  styleUrls: ['./who.component.scss']
})
export class WhoComponent implements OnInit {

  constructor(
    private pageMetadataService: PageMetadataService
  ) { }

  ngOnInit() {
    this.pageMetadataService.post(PageMetadatas.who);
  }
}
