import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HelloWorldComponent } from './hello-world/hello-world-component/hello-world-component';
import { CounterComponent } from './counter/counter-component/counter-component';
import { BindingComponent } from './binding/binding-component/binding-component';
import { PipesComponent } from './pipes/pipes-component/pipes-component';
import { FormComponent } from './forms/form-component/form-component';
import { ReactiveFormsComp } from './reactive-forms/reactive-forms-comp/reactive-forms-comp';
import { CreateForm } from './create/create-form/create-form';
import { AgTable } from './ag-grid/ag-table/ag-table';
import { AgChart } from './ag-charts/ag-chart/ag-chart';
import { PostComponent } from './post/post-component/post-component';
import { PostForm } from './post/post-component/post-form/post-form';


const routes: Routes = [
  { path: '', component: HelloWorldComponent },
  { path: 'home', component: HelloWorldComponent },
  { path: 'counter', component: CounterComponent },
  { path: 'binding', component: BindingComponent },
  { path: 'pipes', component: PipesComponent },
  { path: 'create', component: CreateForm },
  { path: 'agtable', component: AgTable },
  { path: 'agchart', component: AgChart },
  { path: 'postComponent', component: PostComponent },
  { path: 'postForm/create', component: PostForm },
  { path: 'postForm/edit/:ID', component: PostForm },
  {
    path: 'employees',
    loadChildren: () => import('./employees/employees-module').then(m => m.EmployeesModule)
  },
  { path: 'forms', component: FormComponent },
  { path: 'reactive-forms', component: ReactiveFormsComp },
  {
    path: 'core-feature',
    loadChildren: () => import('./core-feature/core-feature-module').then(m => m.CoreFeatureModule)
  },
  //{
  //  path: 'angular-material',
 //   loadChildren: () => import('./angular-material/angular-material-module').then(m => m.AngularMaterialModule)
 // },
 
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
