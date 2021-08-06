import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CountriesComponent } from './pages/countries/countries.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/countries',
    pathMatch: 'full'
  },
  {
    path: 'countries',
    component: CountriesComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }