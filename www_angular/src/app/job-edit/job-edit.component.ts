import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { JobsService } from '../jobs.service';

import Corr from '../Corr';
import Acl from '../Acl';


@Component({
  selector: 'app-job-edit',
  templateUrl: './job-edit.component.html',
  styleUrls: ['./job-edit.component.css']
})
export class JobEditComponent implements OnInit {

  angForm: FormGroup;
  corrForm: FormGroup;
  aclForm: FormGroup;
  job: any = {};
  corrs: Corr[];
  acls: Acl[];


  constructor(private route: ActivatedRoute, 
                private router: Router, 
                private ps: JobsService, 
                private fb: FormBuilder) {
      this.createAngForm();
      this.createCorrForm();
      this.createAclForm();
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

  createAclForm() {
    this.aclForm = this.fb.group({
      AclDesc: ['', Validators.required ],
      AclLink: [''],
      AclQty: ['1', Validators.required ],
      AclCost: ['', Validators.required ]
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

    });

  }

  updateAcl(AclDesc, AclLink, AclQty, AclCost, AclID, id) {
    this.route.params.subscribe(params => {
      this.ps.updateAcl(AclDesc, AclLink, AclQty, AclCost, AclID, params.id)
      .subscribe(res => {
        this.refreshAcls(params.id);
        this.createAclForm();
      });

    });

  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.ps.editJob(params['id']).subscribe(res => {
        this.job = res;
      });
      this.refreshCorrs(params['id']);
      this.refreshAcls(params['id']);
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
  deleteAcl(job, id) {
    this.ps.deleteAcl(id).subscribe(res => {
      this.refreshAcls(job);
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

  refreshAcls(id){
    console.log("Refresh Acls");
    this.ps
        .getAcls(id)
        .subscribe((data: Acl[]) => {
          this.acls = data; 
      });
  }

}