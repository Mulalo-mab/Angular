import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Heroes } from './heroes/heroes';
import { HeroDetail } from './hero-detail/hero-detail';

const routes: Routes = [
  { path: 'heroes', component: Heroes }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
