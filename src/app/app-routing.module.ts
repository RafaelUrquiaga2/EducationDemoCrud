import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentsComponent } from './students/pages/students/students.component';
import { HomeComponent } from './public/home/home.component';
import { AboutComponent } from './public/about/about.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'about', component: AboutComponent},
  //¿Que es pathMatch: 'full'?
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'students', component: StudentsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
