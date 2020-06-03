import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QualityService {

  private API_URL = environment.API_URL;

  private token: string;
  

  constructor(private http: HttpClient) { }

  private extractData(res: any) {
    let body = res.data;
    return body || {};
  }

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


  getquality(drgcode): Observable<any> {

    return this.http.get('http://localhost:3000/api/quality/' + drgcode ,{ headers: { Authorization: `Bearer ${this.getToken()}` } }).pipe(
      map(this.extractData1));
  }

  addQuality(datas): Observable<any> {
    return this.http.post<any>('http://localhost:3000/api/quality/', datas,{ headers: { Authorization: `Bearer ${this.getToken()}` } }).pipe(
      map(this.extractData1));
  }

  updateQuality(id, datas): Observable<any> {
    return this.http.put<any>('http://localhost:3000/api/quality/' + id, datas,{ headers: { Authorization: `Bearer ${this.getToken()}` } }).pipe(
      map(this.extractData1));
  }

  deleteQuality(id): Observable<any> {
    return this.http.delete('http://localhost:3000/api/quality/' + id,{ headers: { Authorization: `Bearer ${this.getToken()}` } }).pipe(
      map(this.extractData1));
  }



}
