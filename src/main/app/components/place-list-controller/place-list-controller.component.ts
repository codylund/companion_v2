import { Component, OnInit } from '@angular/core';
import { NuggetService } from '../../core/service/nugget.service';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-place-list-controller',
  templateUrl: './place-list-controller.component.html',
  styleUrls: ['./place-list-controller.component.scss']
})
export class PlaceListControllerComponent implements OnInit {

  countries = [
    "Mexico",
    "Thailand",
    "USA",
    "Vietnam"
  ];
  selectedCountries: string[] = [];

  constructor(
    private nuggetService: NuggetService
  ) { 
    this.selectedCountries = this.nuggetService.getCountries();
  }

  ngOnInit() {
  }

  updateCountries() {
    this.nuggetService.setCountries(this.selectedCountries);
  }
}
