import { Component, OnInit } from '@angular/core';
import Asco from '../Asco';
import { AscosService } from '../ascos.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-asco-get',
  templateUrl: './asco-get.component.html',
  styleUrls: ['./asco-get.component.css']
})
export class AscoGetComponent implements OnInit {

  ascos: Asco[];
  selectedStatus: any;

  constructor(private http: HttpClient, 
  		private ps: AscosService) { }

  ngOnInit() {
    this.ps
      .getAscos()
      .subscribe((data: Asco[]) => {
        this.ascos = data;
    });
  }

}
