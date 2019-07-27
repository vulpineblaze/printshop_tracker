import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { JobsService } from './jobs.service';
import { AscosService } from './ascos.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JobAddComponent } from './job-add/job-add.component';
import { JobGetComponent } from './job-get/job-get.component';
import { JobEditComponent } from './job-edit/job-edit.component';
import { AscoAddComponent } from './asco-add/asco-add.component';
import { AscoGetComponent } from './asco-get/asco-get.component';
import { AscoEditComponent } from './asco-edit/asco-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    JobAddComponent,
    JobGetComponent,
    JobEditComponent,
    AscoAddComponent,
    AscoGetComponent,
    AscoEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SlimLoadingBarModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [JobsService, AscosService],
  bootstrap: [AppComponent]
})
export class AppModule { }
