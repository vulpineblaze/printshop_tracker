import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { JobsService } from '../jobs.service';

import Corr from '../Corr';


@Component({
  selector: 'app-job-edit',
  templateUrl: './job-edit.component.html',
  styleUrls: ['./job-edit.component.css']
})
export class JobEditComponent implements OnInit {

  angForm: FormGroup;
  corrForm: FormGroup;
  job: any = {};
  corrs: Corr[];


  constructor(private route: ActivatedRoute, 
                private router: Router, 
                private ps: JobsService, 
                private fb: FormBuilder) {
      this.createAngForm();
      this.createCorrForm();
 }

  createAngForm() {
    this.angForm = this.fb.group({
      JobName: ['', Validators.required ],
      JobDescription: ['', Validators.required ]
    });
  }

  createCorrForm() {
    this.corrForm = this.fb.group({
      CorrName: ['', Validators.required ],
      CorrDesc: ['', Validators.required ],
      CorrLink: ['']
    });
  }

  updateJob(JobName, JobDescription, id) {
    this.route.params.subscribe(params => {
      this.ps.updateJob(JobName, JobDescription, params.id);
      this.router.navigate(['jobs']);
    });
  }


  updateCorr(CorrName, CorrDesc, CorrLink, CorrID, id) {
    this.route.params.subscribe(params => {
      this.ps.updateCorr(CorrName, CorrDesc, CorrLink, CorrID, params.id)
      .subscribe(res => {
        this.refreshCorrs(params.id);
        this.createCorrForm();
      });



      // this.refreshCorrs(params['id']);
      // this.router.navigate(['edit/'+params.id]);
    });

  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.ps.editJob(params['id']).subscribe(res => {
        this.job = res;
      });
      this.refreshCorrs(params['id']);
    });

    
  }

  deleteJob(id) {
    this.ps.deleteJob(id).subscribe(res => {
      // this.jobs.splice(id, 1);
      this.router.navigate(['jobs']);
    });
  }
  deleteCorr(job, id) {
    this.ps.deleteCorr(id).subscribe(res => {
      // this.jobs.splice(id, 1);
      // this.router.navigate(['jobs']);
      // this.router.navigate(['edit/'+job]);
      this.refreshCorrs(job);
    });
  }

  refreshCorrs(id){
    console.log("Refresh Corrs");
    this.ps
        .getCorrs(id)
        .subscribe((data: Corr[]) => {
          this.corrs = data; 
      });
  }

}