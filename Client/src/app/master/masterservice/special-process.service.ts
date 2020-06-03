import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})

export class SpecialProcessService {

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


  getData(): Observable<any> {
    return this.http.get(this.API_URL+'/api/master/specialpro',{ headers: { Authorization: `Bearer ${this.getToken()}` } }).pipe(
      map(this.extractData));
  }

  addData(datas): Observable<any> {
    return this.http.post<any>(this.API_URL+'/api/master/specialpro', datas,{ headers: { Authorization: `Bearer ${this.getToken()}` } }).pipe(
      map(this.extractData1));
  }

  updateData(id, datas): Observable<any> {
    return this.http.put<any>(this.API_URL+'/api/master/specialpro/' + id, datas,{ headers: { Authorization: `Bearer ${this.getToken()}` } }).pipe(
      map(this.extractData1));
  }

  deleteData(id): Observable<any> {
    return this.http.delete(this.API_URL+'/api/master/specialpro/' + id,{ headers: { Authorization: `Bearer ${this.getToken()}` } }).pipe(
      map(this.extractData1));
  }
}
