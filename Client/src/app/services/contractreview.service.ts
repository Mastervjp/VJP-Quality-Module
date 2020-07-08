import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContractreviewService {

  private token: string;
  private API_URL = environment.API_URL;

  constructor(private http: HttpClient) { }

  private extractData1(res: any) {

    debugger;
    let body = res;
    return body || {};
  }

  private getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('mean-token');
    }
    return this.token;
  }
  
  addData(datas): Observable<any> {
    debugger
    console.log("service:",datas);
    
    return this.http.post<any>(this.API_URL+'/api/contractreview/',datas ,{ headers: { Authorization: `Bearer ${this.getToken()}` } }).pipe(
      map(this.extractData1));
  }

  getData(): Observable<any> {
    return this.http.get(this.API_URL+'/api/contractreview/',{ headers: { Authorization: `Bearer ${this.getToken()}` } }).pipe(
      map(this.extractData1));
  }

  getCustomerData(customerName): Observable<any> { 
    debugger
    return this.http.get(this.API_URL+'/api/contractreview/one/'+customerName, { headers: { Authorization: `Bearer ${this.getToken()}` } }).pipe(
      map(this.extractData1));
      
      
  }
}