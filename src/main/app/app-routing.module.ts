import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NuggetComponent } from './components/nugget/nugget.component';
import { NuggetListComponent } from './components/nugget-list/nugget-list.component';
import { WhoComponent } from './components/who/who.component';
import { NewPlaceComponent } from './components/new-place/new-place.component';
import { BlogComponent } from './components/blog/blog.component';

const routes: Routes = [
  {
    path: '', component: NuggetListComponent
  },
  {
    path: 'blog', component: BlogComponent
  },
  {
    path: 'places/make', component: NewPlaceComponent 
  },
  {
    path: 'places/:id', component: NuggetComponent 
  },
  {
    path: 'who', component: WhoComponent
  },
  {
    // Redirect to the nugget list.
    path: '**', redirectTo: '', pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
