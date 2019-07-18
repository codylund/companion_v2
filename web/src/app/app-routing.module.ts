import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NuggetComponent } from './components/nugget/nugget.component';


const routes: Routes = [
  {
    path: '', component: NuggetComponent
  },
  {
    path: 'nugget/:id', component: NuggetComponent 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
