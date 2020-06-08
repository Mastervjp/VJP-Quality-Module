import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProcessService {

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


  getprocess(drgcode, opno): Observable<any> {

    return this.http.get(this.API_URL+'/api/process/' + drgcode + '/' + opno,{ headers: { Authorization: `Bearer ${this.getToken()}` } }).pipe(
      map(this.extractData1));
  }

  getaltproQp(drgcode, opno): Observable<any> {

    return this.http.get(this.API_URL+'/api/process/altprocess/' + drgcode + '/' + opno,{ headers: { Authorization: `Bearer ${this.getToken()}` } }).pipe(
      map(this.extractData1));
  }

  addProcess(datas): Observable<any> {
    return this.http.post<any>(this.API_URL+'/api/process/', datas,{ headers: { Authorization: `Bearer ${this.getToken()}` } }).pipe(
      map(this.extractData1));
  }

  updateProcess(id, datas): Observable<any> {
    return this.http.put<any>(this.API_URL+'/api/process/' + id, datas,{ headers: { Authorization: `Bearer ${this.getToken()}` } }).pipe(
      map(this.extractData1));
  }

  deleteProcess(id): Observable<any> {
    return this.http.delete(this.API_URL+'/api/process/' + id,{ headers: { Authorization: `Bearer ${this.getToken()}` } }).pipe(
      map(this.extractData1));
  }

  getInstrument(){ 

    return this.http.get(this.API_URL+'/api/operation/data/instrument' ,{ headers: { Authorization: `Bearer ${this.getToken()}` } }).pipe(
      map(this.extractData1));
  }

  getMeasuring(){ 

    return this.http.get(this.API_URL+'/api/operation/data/measuring',{ headers: { Authorization: `Bearer ${this.getToken()}` } }).pipe(
      map(this.extractData1));
  }


  confirmQuality(drgcode): Observable<any> {

    return this.http.put(this.API_URL+'/api/process/func/plan/' + drgcode ,{ headers: { Authorization: `Bearer ${this.getToken()}` } }).pipe(
      map(this.extractData1));
  }


}
