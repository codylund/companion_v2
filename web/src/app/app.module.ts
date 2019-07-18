import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NgxGalleryModule } from 'ngx-gallery';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NuggetComponent } from './components/nugget/nugget.component';
import { NuggetService } from './core/service/nugget.service';
import { NavComponent } from './components/nav/nav.component';
import { ActivityBadgeComponent } from './components/badges/activity-badge/activity-badge.component';
import { LocalNuggetProvider } from './core/provider/LocalNuggetProvider';
import { GalleryComponent } from './components/gallery/gallery.component';

@NgModule({
  declarations: [
    AppComponent,
    NuggetComponent,
    NavComponent,
    ActivityBadgeComponent,
    GalleryComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    NgxGalleryModule
  ],
  providers: [
    NuggetService,
    LocalNuggetProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
