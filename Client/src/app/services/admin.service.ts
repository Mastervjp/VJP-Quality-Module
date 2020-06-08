
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable()

export class AdminService {

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


  getUser(): Observable<any> {
    return this.http.get(this.API_URL+'/api/admin/',{ headers: { Authorization: `Bearer ${this.getToken()}` } }).pipe(
      map(this.extractData));
  }

  addUser(datas): Observable<any> {
    return this.http.post<any>(this.API_URL+'/api/admin/signup', datas,{ headers: { Authorization: `Bearer ${this.getToken()}` } }).pipe(
      map(this.extractData1));
  }

  updateUser(id, datas): Observable<any> {
      return this.http.put<any>(this.API_URL+'/api/admin/' + id, datas,{ headers: { Authorization: `Bearer ${this.getToken()}` } }).pipe(
      map(this.extractData1));
  }





  deleteUser(id): Observable<any> {
    return this.http.delete(this.API_URL+'/api/admin/' + id,{ headers: { Authorization: `Bearer ${this.getToken()}` } }).pipe(
      map(this.extractData1));
  }



}

