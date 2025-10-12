import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HelloWorldComponent } from './hello-world/hello-world-component/hello-world-component';
import { CounterComponent } from './counter/counter-component/counter-component';
import { BindingComponent } from './binding/binding-component/binding-component';
import { PipesComponent } from './pipes/pipes-component/pipes-component';


const routes: Routes = [
  { path: '', component: HelloWorldComponent },
  { path: 'home', component: HelloWorldComponent },
  { path: 'counter', component: CounterComponent },
  { path: 'binding', component: BindingComponent },
  { path: 'pipes', component: PipesComponent },
  {
    path: 'employees',
    loadChildren: () => import('./employees/employees-module').then(m => m.EmployeesModule)
  },
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
