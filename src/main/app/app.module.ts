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
import { NewPlaceComponent } from './components/new-place/new-place.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { MarkdownModule } from 'ngx-markdown';
import { BlogComponent } from './components/blog/blog.component';
import { LandingComponent } from './components/landing/landing.component';
import { InstagramHighlightComponent } from './components/instagram-highlight/instagram-highlight.component';
import { DyanamicLinkComponent } from './components/dyanamic-link/dyanamic-link.component';

@NgModule({
  declarations: [
    AppComponent,
    BlogComponent,
    NuggetComponent,
    NavComponent,
    MetadataComponent,
    NuggetListComponent,
    GalleryComponent,
    WhoComponent,
    PlaceListControllerComponent,
    NewPlaceComponent,
    LandingComponent,
    InstagramHighlightComponent,
    DyanamicLinkComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MarkdownModule.forRoot(),
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatListModule,
    MatCardModule,
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
