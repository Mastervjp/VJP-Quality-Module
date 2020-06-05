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
    return this.http.get('http://192.168.1.222:3000/api/sample/' + drgcode ,{ headers: { Authorization: `Bearer ${this.getToken()}` } }).pipe(
      map(this.extractData));
  }

  addSampling(datas): Observable<any> {
    return this.http.post<any>('http://192.168.1.222:3000/api/sample/', datas,{ headers: { Authorization: `Bearer ${this.getToken()}` } }).pipe(
      map(this.extractData));
  }

  updateSampling(datas,id): Observable<any> {
    return this.http.post<any>('http://192.168.1.222:3000/api/samole/'+id, datas,{ headers: { Authorization: `Bearer ${this.getToken()}` } }).pipe(
      map(this.extractData));
  }
}
