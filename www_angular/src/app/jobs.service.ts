import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class JobsService {

	uri = 'http://'+window.location.hostname+'/jobs';
	// uri = 'http://localhost:4000/jobs';

  constructor(private http: HttpClient) { }

  addJob(JobName, JobDescription) {
    const obj = {
      JobName,
      JobDescription
    };
    console.log("JobsService",obj);
    this.http.post(`${this.uri}/add`, obj)
        .subscribe(res => console.log('Done'));
  }

  getJobs() {
    return this
           .http
           .get(`${this.uri}`);
  }

  getCorrs(id) {
    return this
           .http
           .get(`${this.uri}/corr/${id}`);
  }

  editJob(id) {
    return this
            .http
            .get(`${this.uri}/edit/${id}`);
  }

  updateJob(JobName, JobDescription, id) {
    const obj = {
      JobName,
      JobDescription
    };
    this
      .http
      .post(`${this.uri}/update/${id}`, obj)
      .subscribe(res => console.log('Done'));
  }

  updateCorr(CorrName, CorrDesc, CorrLink, CorrID, id) {
    const obj = {
      CorrName, CorrDesc, CorrLink, CorrID
    };
    return this
      .http
      .post(`${this.uri}/corr/${id}/update`, obj);
  }

  deleteJob(id) {
    return this
              .http
              .get(`${this.uri}/delete/${id}`);
  }

  deleteCorr(id) {
    return this
              .http
              .get(`${this.uri}/corr/${id}/delete`);
  }

  updateStatus(status,id){
    var cleanStatus = encodeURIComponent(status);
    console.log(status, id, cleanStatus);
    
    return this
              .http
              .get(`${this.uri}/status/${id}/${cleanStatus}`);

  }

} 
