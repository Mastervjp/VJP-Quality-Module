import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class MaterialService {
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


  getMaterial(): Observable<any> {
    return this.http.get(this.API_URL+'/api/master/material',{ headers: { Authorization: `Bearer ${this.getToken()}` } }).pipe(
      map(this.extractData));
  }

  addMaterial(datas): Observable<any> {
    return this.http.post<any>(this.API_URL+'/api/master/material', datas,{ headers: { Authorization: `Bearer ${this.getToken()}` } }).pipe(
      map(this.extractData1));
  }

  updateMaterial(id, datas): Observable<any> {
    return this.http.put<any>(this.API_URL+'/api/master/material/' + id, datas,{ headers: { Authorization: `Bearer ${this.getToken()}` } }).pipe(
      map(this.extractData1));
  }

  deleteData(id): Observable<any> {
    return this.http.delete(this.API_URL+'/api/master/material/' + id,{ headers: { Authorization: `Bearer ${this.getToken()}` } }).pipe(
      map(this.extractData1));
  }


}
