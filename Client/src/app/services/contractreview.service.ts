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
  Data: any;

  constructor(private http: HttpClient) { }

  private extractData1(res: any) {
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
    console.log("service:", datas);

    return this.http.post<any>(this.API_URL + '/api/contractreview/', datas, { headers: { Authorization: `Bearer ${this.getToken()}` } }).pipe(
      map(this.extractData1));
  }

  getData(): Observable<any> {
    return this.http.get(this.API_URL + '/api/contractreview/', { headers: { Authorization: `Bearer ${this.getToken()}` } }).pipe(
      map(this.extractData1));
  }

  getCustomerData(id): Observable<any> {
    return this.http.get(this.API_URL + '/api/contractreview/one/' + id, { headers: { Authorization: `Bearer ${this.getToken()}` } }).pipe(
      map(this.extractData1));
  }
  updatestatus(id, status): Observable<any> {
    return this.http.put<any>(this.API_URL + '/api/contractreview/status/' + id, status, { headers: { Authorization: `Bearer ${this.getToken()}` } }).pipe(
      map(this.extractData1));
  }
  updateContract(id, datas): Observable<any> {
    return this.http.put<any>(this.API_URL+'/api/contractreview/' + id, datas,{ headers: { Authorization: `Bearer ${this.getToken()}` } }).pipe(
      map(this.extractData1));
  }
  rejectcomment(id, statusComment): Observable<any> {
    return this.http.put<any>(this.API_URL + '/api/contractreview/' + id, statusComment, { headers: { Authorization: `Bearer ${this.getToken()}` } }).pipe(
      map(this.extractData1));
  }
}