import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NuggetComponent } from './components/nugget/nugget.component';
import { NuggetService } from './core/service/nugget.service';
import { NavComponent } from './components/nav/nav.component';
import { MetadataComponent } from './components/metadata/metadata.component';
import { NuggetListComponent } from './components/nugget-list/nugget-list.component';
import { NuggetProviderFactory } from './core/provider/NuggetProviderFactory';
import { GalleryFsComponent } from './components/gallery-fs/gallery-fs.component';
import { GlobeComponent } from './components/globe/globe.component';
import { GlobeService } from './core/service/globe/globe.service';
import { WhoComponent } from './components/who/who.component';

@NgModule({
  declarations: [
    AppComponent,
    NuggetComponent,
    NavComponent,
    MetadataComponent,
    NuggetListComponent,
    GalleryFsComponent,
    GlobeComponent,
    WhoComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule
  ],
  providers: [
    GlobeService,
    NuggetService,
    NuggetProviderFactory
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
