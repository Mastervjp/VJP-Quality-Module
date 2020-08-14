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

    return this.http.get(this.API_URL+'/api/quality/' + drgcode ,{ headers: { Authorization: `Bearer ${this.getToken()}` } }).pipe(
      map(this.extractData1));
  }
  getDrawing(drgcode): Observable<any> {
    return this.http.get(this.API_URL+'/api/quality/drawing/' + drgcode ,{ headers: { Authorization: `Bearer ${this.getToken()}` } }).pipe(
      map(this.extractData1));
  }
  addQuality(datas): Observable<any> {
    return this.http.post<any>(this.API_URL+'/api/quality/', datas,{ headers: { Authorization: `Bearer ${this.getToken()}` } }).pipe(
      map(this.extractData1));
  }

  updateQuality(id, datas): Observable<any> {
    return this.http.put<any>(this.API_URL+'/api/quality/' + id, datas,{ headers: { Authorization: `Bearer ${this.getToken()}` } }).pipe(
      map(this.extractData1));
  }

  deleteQuality(id): Observable<any> {
    return this.http.delete(this.API_URL+'/api/quality/' + id,{ headers: { Authorization: `Bearer ${this.getToken()}` } }).pipe(
      map(this.extractData1));
  }
  approval(pfno, status): Observable<any> {
    return this.http.put<any>(this.API_URL + '/api/quality/plan/' + pfno, status, { headers: { Authorization: `Bearer ${this.getToken()}` } }).pipe(
      map(this.extractData1));      
  }
  
  approvalMaster(pfno, masterStatus): Observable<any> {
    return this.http.put<any>(this.API_URL + '/api/quality/plan/' + pfno, masterStatus, { headers: { Authorization: `Bearer ${this.getToken()}` } }).pipe(
      map(this.extractData1));      
  }

  updatestatus(pfno, operatorStatus): Observable<any> {
    return this.http.put<any>(this.API_URL + '/api/quality/plan/' + pfno, operatorStatus, { headers: { Authorization: `Bearer ${this.getToken()}` } }).pipe(
      map(this.extractData1));      
  }

  approvalsample(drgId, status): Observable<any> {
    return this.http.put<any>(this.API_URL + '/api/quality/plan/sample/' + drgId, status, { headers: { Authorization: `Bearer ${this.getToken()}` } }).pipe(
      map(this.extractData1));      
  }

  approvalSampleMaster(drgId, masterStatus): Observable<any> {
    return this.http.put<any>(this.API_URL + '/api/quality/plan/sample/' + drgId, masterStatus, { headers: { Authorization: `Bearer ${this.getToken()}` } }).pipe(
      map(this.extractData1));      
  }

  updatesamplestatus(drgId, operatorStatus): Observable<any> {
    return this.http.put<any>(this.API_URL + '/api/quality/plan/sample/' + drgId, operatorStatus, { headers: { Authorization: `Bearer ${this.getToken()}` } }).pipe(
      map(this.extractData1));      
  }


}
