import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { MatSelectModule } from '@angular/material/select'
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlaceComponent } from './components/place/place.component';
import { PlaceService } from './core/service/place.service';
import { NavComponent } from './components/nav/nav.component';
import { MetadataComponent } from './components/metadata/metadata.component';
import { PlaceListComponent } from './components/place-list/place-list.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { WhoComponent } from './components/who/who.component';
import { PageMetadataService } from './core/service/page-metadata.service';
import { PlaceListControllerComponent } from './components/place-list-controller/place-list-controller.component';
import { NewPlaceComponent } from './components/new-place/new-place.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MarkdownModule } from 'ngx-markdown';
import { BlogComponent } from './components/blog/blog.component';
import { LandingComponent } from './components/landing/landing.component';
import { InstagramHighlightComponent } from './components/instagram-highlight/instagram-highlight.component';

@NgModule({
  declarations: [
    AppComponent,
    BlogComponent,
    PlaceComponent,
    NavComponent,
    MetadataComponent,
    PlaceListComponent,
    GalleryComponent,
    WhoComponent,
    PlaceListControllerComponent,
    NewPlaceComponent,
    LandingComponent,
    InstagramHighlightComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    DragDropModule,
    FormsModule,
    HttpClientModule,
    MarkdownModule.forRoot(),
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatListModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    ReactiveFormsModule
  ],
  providers: [
    PlaceService,
    PageMetadataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
