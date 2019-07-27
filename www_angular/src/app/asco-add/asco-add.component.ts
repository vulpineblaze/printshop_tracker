import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AscosService } from '../ascos.service';

@Component({
  selector: 'app-asco-add',
  templateUrl: './asco-add.component.html',
  styleUrls: ['./asco-add.component.css']
})
export class AscoAddComponent implements OnInit {

angForm: FormGroup;
  constructor(private fb: FormBuilder, 
  		private route: ActivatedRoute, 
  		private router: Router,
  		 private ps: AscosService) {
    this.createForm();
  }

  createForm() {
    this.angForm = this.fb.group({
      AscoName: ['', Validators.required ]
    });
  }

  addAsco(AscoName) {
    this.ps.addAsco(AscoName); 
    this.router.navigate(['ascos']);
  }

  ngOnInit() {
  } 

}
