import { Component, OnInit, ElementRef } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  /**
   * Is true when the root route is activated.
   */
  isRootRoute = false;

  constructor(
    router: Router
  ) { 
    // Listen for nav events to/from the root route.
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isRootRoute = ("/" == event.url);
      }
    });
  }

  ngOnInit() {
  }
}
