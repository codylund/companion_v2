import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlaceComponent } from './ui/pages/place/place.component';
import { PlaceListComponent } from './ui/pages/place-list/place-list.component';
import { WhoComponent } from './ui/pages/who/who.component';
import { NewPlaceComponent } from './ui/pages/new-place/new-place.component';
import { LandingComponent } from './ui/pages/landing/landing.component';
import { InstagramHighlightComponent } from './ui/components/media/instagram-highlight/instagram-highlight.component';

const routes: Routes = [
  {
    path: '', component: LandingComponent
  },
  {
    path: 'places', component: PlaceListComponent
  },
  {
    path: 'places/make', component: NewPlaceComponent 
  },
  {
    path: 'places/:id', component: PlaceComponent 
  },
  {
    path: 'who', component: WhoComponent
  },
  {
    path: 'instagram', component: InstagramHighlightComponent
  },
  {
    // Redirect to the nugget list.
    path: '**', redirectTo: '', pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
