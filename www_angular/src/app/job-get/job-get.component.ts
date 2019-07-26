import { Component, OnInit } from '@angular/core';
import Job from '../Job';
import Status from '../Status';
import { JobsService } from '../jobs.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ "Authorization": "Bearer d849acc0-66e6-4f17-8405-5e0a85cf7833" })
};

@Component({
  selector: 'app-job-get',
  templateUrl: './job-get.component.html',
  styleUrls: ['./job-get.component.css']
})
export class JobGetComponent implements OnInit {

  jobs: Job[];
  selectedStatus: any;

	constructor(private http: HttpClient, private ps: JobsService) { }

  ngOnInit() {
    this.ps
      .getJobs()
      .subscribe((data: Job[]) => {
        this.jobs = data;
        // console.log(this.jobs);
        var i;
        for(i=0;i<this.jobs.length;i++){
          var job = this.jobs[i];
          var statusOption = "Choose One";
          console.log(i,job);
          if(!job || 
              !job.JobStatuses || 
              !job.JobStatuses.slice(-1)[0] || 
              !job.JobStatuses.slice(-1)[0].StatusName.toString() ){
            //doesnt exist
          }else{
            statusOption = job.JobStatuses.slice(-1)[0].StatusName.toString();
          }
          // job.status = statusOption;
          Object.assign(job, {status: statusOption});
        }
        
    });

    var url = 'https://coda.io/apis/v1beta1/docs/dKUgkxSKaN/tables/grid-MiEbvmG5XT/rows';
    this.http.request('GET', url, httpOptions)
        .subscribe(
        (data)=> {
            for(let key in data){
              if(!!data.hasOwnProperty('items') && (data as any).items){
                console.log("data.items");
                // this.statuses = data.items;
          			Object.assign(this, {statuses: (data as any).items});
              }
            }
        },
        (error) => console.log("error : " + error)
    );
  }

  changeStatus(e, id) {    
    this.ps.updateStatus(e.target.value,id).subscribe(res => {
      console.log(e.target.value , id);
      // this.router.navigate(['jobs']);
    });
  }

}
