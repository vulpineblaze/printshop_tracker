import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AscosService {

  uri = 'http://'+window.location.hostname+'/ascos';

  constructor(private http: HttpClient) { }

  addAsco(AscoName) {
    const obj = {
      AscoName
    };
    this.http.post(`${this.uri}/add`, obj)
        .subscribe(res => console.log('Done'));
  }

  getAscos() {
    return this
           .http
           .get(`${this.uri}`);
  }

  editAsco(id) {
    return this
            .http
            .get(`${this.uri}/edit/${id}`);
  }

  updateAsco(AscoName, id) {
    const obj = {
      AscoName
    };
    this
      .http
      .post(`${this.uri}/update/${id}`, obj)
      .subscribe(res => console.log('Update Complete'));
  }

  deleteAsco(id) {
    return this
              .http
              .get(`${this.uri}/delete/${id}`);
  }



  getAddrs(id) {
    return this
           .http
           .get(`${this.uri}/addr/${id}`);
  }

  updateAddr(Addr1, Addr2, Addr3, Addr4, Addr5, Addr6, AddrID, id) {
    const addrObj = {
      Addr1, Addr2, Addr3, Addr4, Addr5, Addr6, AddrID
    };
    return this
      .http
      .post(`${this.uri}/addr/${id}/update`, addrObj);
  }

  deleteAddr(id) {
    return this
              .http
              .get(`${this.uri}/addr/${id}/delete`);
  }





  getContacts(id) {
    return this
           .http
           .get(`${this.uri}/contact/${id}`);
  }

  updateContact(ContactName, ContactEmail, ContactPhone, ContactNote, ContactID, id) {
    const contactObj = {
      ContactName, ContactEmail, ContactPhone, ContactNote, ContactID
    };
    return this
      .http
      .post(`${this.uri}/contact/${id}/update`, contactObj);
  }

  deleteContact(id) {
    return this
              .http
              .get(`${this.uri}/contact/${id}/delete`);
  }


}
