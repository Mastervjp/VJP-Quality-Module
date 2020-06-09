import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MarketService {
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


  getRoutedata(): Observable<any> {
    return this.http.get(this.API_URL+'/api/market/',{ headers: { Authorization: `Bearer ${this.getToken()}` } }).pipe(
      map(this.extractData1));
  }


  getAbstract(mpId): Observable<any> {
    return this.http.get(this.API_URL+'/api/market/card/'+mpId,{ headers: { Authorization: `Bearer ${this.getToken()}` } }).pipe(
      map(this.extractData1));
  }


  getCarddata(drgid): Observable<any> {
    return this.http.get(this.API_URL+'/api/market/view/'+drgid,{ headers: { Authorization: `Bearer ${this.getToken()}` } }).pipe(
      map(this.extractData1));
  }

  getCardHeader(mpId): Observable<any> {
    return this.http.get(this.API_URL+'/api/market/header/'+mpId,{ headers: { Authorization: `Bearer ${this.getToken()}` } }).pipe(
      map(this.extractData1));
  }


  getRemainingQty(mpId): Observable<any> {
    return this.http.get(this.API_URL+'/api/market/rqty/'+mpId,{ headers: { Authorization: `Bearer ${this.getToken()}` } }).pipe(
      map(this.extractData1));
  }
  
  addRoute(datas): Observable<any> {
    return this.http.post<any>(this.API_URL+'/api/market/', datas,{ headers: { Authorization: `Bearer ${this.getToken()}` } }).pipe(
      map(this.extractData1));
  }

  addCard(datas): Observable<any> {
    return this.http.post<any>(this.API_URL+'/api/market/card', datas,{ headers: { Authorization: `Bearer ${this.getToken()}` } }).pipe(
      map(this.extractData1));
  }




}
