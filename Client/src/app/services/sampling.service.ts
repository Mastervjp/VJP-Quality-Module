import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SamplingService {
  private API_URL = environment.API_URL;

  private token: string;
  

  constructor(private http: HttpClient) { }

  private extractData(res: any) {
    let body = res;
    return body || {};
  }

  private getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('mean-token');
    }
    return this.token;
  }


  getSampling(drgcode): Observable<any> {
    return this.http.get(this.API_URL+'/api/sample/' + drgcode ,{ headers: { Authorization: `Bearer ${this.getToken()}` } }).pipe(
      map(this.extractData));
  }

  addSampling(datas): Observable<any> {
    return this.http.post<any>(this.API_URL+'/api/sample/', datas,{ headers: { Authorization: `Bearer ${this.getToken()}` } }).pipe(
      map(this.extractData));
  }

  updateSampling(id, datas): Observable<any> {
    return this.http.put<any>(this.API_URL+'/api/sample/'+id, datas,{ headers: { Authorization: `Bearer ${this.getToken()}` } }).pipe(
      map(this.extractData));
  }

  deleteOperation(id): Observable<any> {
    return this.http.delete(this.API_URL+'/api/process/' + id, { headers: { Authorization: `Bearer ${this.getToken()}` } }).pipe(
      map(this.extractData));
  }
}
