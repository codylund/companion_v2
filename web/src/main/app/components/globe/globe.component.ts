import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import * as d3Geo from 'd3-geo';
import * as d3 from 'd3';
import { NumberSymbol } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { GlobeService } from '../../core/service/globe/globe.service';

@Component({
  selector: 'app-globe',
  templateUrl: './globe.component.html',
  styleUrls: ['./globe.component.scss']
})
export class GlobeComponent implements OnInit {

  @Input() globeSize: number = 500;

  constructor(
    private globeService: GlobeService
  ) {
  }

  ngOnInit(
  ) {
    this.globeService.loadJson().subscribe((res) => this.initGlobe(res));
  }

  private initGlobe(res: any) {
    // var graticule = d3.geoGraticule();
    var geoGenerator = this.createGeoGenerator();

    var u = d3.select('g.map')
      .selectAll('path')
      .data(res.features);
    
    u.enter()
    .append('path')
    .attr('fill', 'orange')
    .attr('d', geoGenerator);

    // // Update graticule
    // d3.select('.graticule path')
    //   .datum(graticule())
    //   .attr('d', geoGenerator);
  }

  private createGeoGenerator() {
    return d3.geoPath()
      .projection(this.createProjection());
  }

  private createProjection(): d3.GeoProjection {
    return d3.geoOrthographic()
        .center([42.324183, -71.052865])
        .scale(500)
        .translate([450, 250]);
  }
}
