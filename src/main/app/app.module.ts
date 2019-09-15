import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { MatSelectModule } from '@angular/material/select'
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
import { GalleryComponent } from './components/gallery/gallery.component';
import { WhoComponent } from './components/who/who.component';
import { PageMetadataService } from './core/service/page-metadata.service';
import { PlaceListControllerComponent } from './components/place-list-controller/place-list-controller.component';

@NgModule({
  declarations: [
    AppComponent,
    NuggetComponent,
    NavComponent,
    MetadataComponent,
    NuggetListComponent,
    GalleryComponent,
    WhoComponent,
    PlaceListControllerComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MatSelectModule,
    ReactiveFormsModule
  ],
  providers: [
    NuggetService,
    NuggetProviderFactory,
    PageMetadataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
