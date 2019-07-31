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
import { GalleryComponent } from './components/gallery/gallery.component';
import { MetadataComponent } from './components/metadata/metadata.component';
import { NuggetListComponent } from './components/nugget-list/nugget-list.component';
import { NuggetProviderFactory } from './core/provider/NuggetProviderFactory';

@NgModule({
  declarations: [
    AppComponent,
    NuggetComponent,
    NavComponent,
    ActivityBadgeComponent,
    GalleryComponent,
    MetadataComponent,
    NuggetListComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    NgxGalleryModule
  ],
  providers: [
    NuggetService,
    NuggetProviderFactory
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
