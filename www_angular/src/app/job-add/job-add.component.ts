import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { JobsService } from '../jobs.service';


@Component({
  selector: 'app-job-add',
  templateUrl: './job-add.component.html',
  styleUrls: ['./job-add.component.css']
})
export class JobAddComponent implements OnInit {

  angForm: FormGroup;
  constructor(private fb: FormBuilder, 
  				private route: ActivatedRoute, 
  				private router: Router, 
  				private ps: JobsService) {
    this.createForm();
  }

  createForm() {
    this.angForm = this.fb.group({
      JobName: ['', Validators.required ],
      JobDescription: ['', Validators.required ]
    });
  }

  addJob(JobName, JobDescription) {
    this.ps.addJob(JobName, JobDescription);
    this.router.navigate(['jobs']);
  }

  ngOnInit() {
  }

}
