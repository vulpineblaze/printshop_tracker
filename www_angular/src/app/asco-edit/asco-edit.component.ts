import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AscosService } from '../ascos.service';

import Addr from '../Addr';
import Contact from '../Contact';

@Component({
  selector: 'app-asco-edit',
  templateUrl: './asco-edit.component.html',
  styleUrls: ['./asco-edit.component.css']
})
export class AscoEditComponent implements OnInit {

	angForm: FormGroup;
  asco: any = {};

  addrForm: FormGroup;
  addrs: Addr[];

  contactForm: FormGroup;
  contacts: Contact[];


  constructor(private route: ActivatedRoute, 
  			private router: Router, 
  			private ps: AscosService, 
  			private fb: FormBuilder) {
    this.createForm();
    this.createAddrForm();
    this.createContactForm();
 }

  createForm() {
    this.angForm = this.fb.group({
      AscoName: ['', Validators.required ]
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.ps.editAsco(params.id).subscribe(res => {
        this.asco = res;
      });
      this.refreshAddrs(params['id']);
      this.refreshContacts(params['id']);
    });
  }

  updateAsco(AscoName, id) {
    this.route.params.subscribe(params => {
      this.ps.updateAsco(AscoName, params.id);
      this.router.navigate(['ascos']);
    });
  }

  deleteAsco(id) {
    this.ps.deleteAsco(id).subscribe(res => {
      // this.ascos.splice(id, 1);
      console.log("deleteAsco("+id+")");
      this.router.navigate(['ascos']);
    });
  }


	createAddrForm() {
    this.addrForm = this.fb.group({
      Addr1: ['', Validators.required ],
      Addr2: [''],
      Addr3: [''],
      Addr4: [''],
      Addr5: [''],
      Addr6: ['']
    });
  }

  updateAddr(Addr1, Addr2, Addr3, Addr4, Addr5, Addr6, AddrID, id) {
    this.route.params.subscribe(params => {
      this.ps.updateAddr(Addr1, Addr2, Addr3, Addr4, Addr5, Addr6, AddrID, params.id)
      .subscribe(res => {
        this.refreshAddrs(params.id);
        this.createAddrForm();
      });
    });
  }

  deleteAddr(job, id) {
    this.ps.deleteAddr(id).subscribe(res => {
      this.refreshAddrs(job);
    });
  }

  refreshAddrs(id){
    console.log("Refresh Addrs");
    this.ps
        .getAddrs(id)
        .subscribe((data: Addr[]) => {
          this.addrs = data; 
      });
  }



	createContactForm() {
    this.contactForm = this.fb.group({
      ContactName: ['', Validators.required ],
      ContactEmail: [''],
      ContactPhone: [''],
      ContactNote: ['']
    });
  }

  updateContact(ContactName, ContactEmail, ContactPhone, ContactNote, ContactID, id) {
    this.route.params.subscribe(params => {
      this.ps.updateContact(ContactName, ContactEmail, ContactPhone, ContactNote, ContactID, params.id)
      .subscribe(res => {
        this.refreshContacts(params.id);
        this.createContactForm();
      });
    });
  }

  deleteContact(job, id) {
    this.ps.deleteContact(id).subscribe(res => {
      this.refreshContacts(job);
    });
  }

  refreshContacts(id){
    console.log("Refresh Contacts");
    this.ps
        .getContacts(id)
        .subscribe((data: Contact[]) => {
          this.contacts = data; 
      });
  }

}
