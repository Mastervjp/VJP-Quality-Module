import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class MeasuringService {
  private API_URL = environment.API_URL;

  private token: string;

  constructor(private http: HttpClient) { }

  private extractData(res: any) {
    let body = res.data;
    return body || {};
  }

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


  getMeasuring(): Observable<any> {
    return this.http.get(this.API_URL+'/api/master/measuring',{ headers: { Authorization: `Bearer ${this.getToken()}` } }).pipe(
      map(this.extractData));
  }

  addMeasuring(datas): Observable<any> {
    return this.http.post<any>(this.API_URL+'/api/master/measuring', datas,{ headers: { Authorization: `Bearer ${this.getToken()}` } }).pipe(
      map(this.extractData1));
  }

  updateMeasuring(id, datas): Observable<any> {
    return this.http.put<any>(this.API_URL+'/api/master/measuring/' + id, datas,{ headers: { Authorization: `Bearer ${this.getToken()}` } }).pipe(
      map(this.extractData1));
  }

  deleteData(id): Observable<any> {
    return this.http.delete(this.API_URL+'/api/master/measuring/' + id,{ headers: { Authorization: `Bearer ${this.getToken()}` } }).pipe(
      map(this.extractData1));
  }



}
