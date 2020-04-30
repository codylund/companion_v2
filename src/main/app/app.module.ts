import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { MatSelectModule } from '@angular/material/select'
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlaceComponent } from './ui/pages/place/place.component';
import { PlaceService } from './core/service/place.service';
import { NavComponent } from './ui/components/nav/nav.component';
import { MetadataComponent } from './ui/components/metadata/metadata.component';
import { PlaceListComponent } from './ui/pages/place-list/place-list.component';
import { GalleryComponent } from './ui/components/media/gallery/gallery.component';
import { WhoComponent } from './ui/pages/who/who.component';
import { PageMetadataService } from './core/service/page-metadata.service';
import { PlaceListControllerComponent } from './ui/components/place-list-controller/place-list-controller.component';
import { NewPlaceComponent } from './ui/pages/new-place/new-place.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MarkdownModule } from 'ngx-markdown';
import { LandingComponent } from './ui/pages/landing/landing.component';
import { BlogComponent } from './ui/pages/blog/view/blog.component';
import { BlogBuilderComponentComponent } from './ui/pages/blog/build-component/blog-builder-component.component';
import { BlogBuilderComponent } from './ui/pages/blog/build/blog-builder.component';
import { EmailFormComponent } from './ui/components/email-form/email-form.component';

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
    BlogBuilderComponent,
    BlogBuilderComponentComponent,
    EmailFormComponent,
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
