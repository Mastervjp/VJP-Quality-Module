import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InspectionService {

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


  getfpi(drgcode,opnId): Observable<any> {
    return this.http.get(this.API_URL+'/api/inspection/fpi/' + drgcode+'/'+opnId,{ headers: { Authorization: `Bearer ${this.getToken()}` } }).pipe(
      map(this.extractData1));
  }
  getfir(drgcode): Observable<any> {
    return this.http.get(this.API_URL+'/api/inspection/fir/' + drgcode,{ headers: { Authorization: `Bearer ${this.getToken()}` } }).pipe(
      map(this.extractData1));
  }

  getmarket(id): Observable<any> {
    return this.http.get(this.API_URL+'/api/inspection/marketdata/' + id,{ headers: { Authorization: `Bearer ${this.getToken()}` } }).pipe(
      map(this.extractData1));
  }

}
