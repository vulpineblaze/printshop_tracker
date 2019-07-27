import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JobAddComponent } from './job-add/job-add.component';
import { JobEditComponent } from './job-edit/job-edit.component';
import { JobGetComponent } from './job-get/job-get.component';
import { AscoAddComponent } from './asco-add/asco-add.component';
import { AscoEditComponent } from './asco-edit/asco-edit.component';
import { AscoGetComponent } from './asco-get/asco-get.component';

const routes: Routes = [
  {
    path: 'job/create',
    component: JobAddComponent
  },
  {
    path: 'edit/:id',
    component: JobEditComponent
  },
  {
    path: 'jobs',
    component: JobGetComponent
  },
  {
    path: 'asco/create',
    component: AscoAddComponent
  },
  {
    path: 'asco/:id',
    component: AscoEditComponent
  },
  {
    path: 'ascos',
    component: AscoGetComponent
  },
  { path: '',   redirectTo: '/jobs', pathMatch: 'full' },
  { path: '**', redirectTo: '/jobs' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }