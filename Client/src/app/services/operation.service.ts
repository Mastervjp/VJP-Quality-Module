import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OperationService {

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


  getoperation(drgid): Observable<any> {
    return this.http.get(this.API_URL+'/api/operation/'+drgid,{ headers: { Authorization: `Bearer ${this.getToken()}` } }).pipe(
      map(this.extractData1));
  }

  getAltprocess(drgid): Observable<any> {
    return this.http.get(this.API_URL+'/api/operation/altprocess/'+drgid,{ headers: { Authorization: `Bearer ${this.getToken()}` } }).pipe(
      map(this.extractData1));
  }

  getkindprocess(drgid): Observable<any> {
    return this.http.get(this.API_URL+'/api/operation/kindprocess/'+drgid,{ headers: { Authorization: `Bearer ${this.getToken()}` } }).pipe(
      map(this.extractData1));
  }

  getWorkcenter(): Observable<any> {
    return this.http.get(this.API_URL+'/api/operation/data/workcenter',{ headers: { Authorization: `Bearer ${this.getToken()}` } }).pipe(
      map(this.extractData1));
  }

  getDrawingtype(): Observable<any> {
    return this.http.get(this.API_URL+'/api/operation/data/drawingtype',{ headers: { Authorization: `Bearer ${this.getToken()}` } }).pipe(
      map(this.extractData1));
  }

  getmaterial(): Observable<any> {
    return this.http.get(this.API_URL+'/api/operation/data/material',{ headers: { Authorization: `Bearer ${this.getToken()}` } }).pipe(
      map(this.extractData1));
  }

  getMachine(): Observable<any> {
    return this.http.get(this.API_URL+'/api/operation/data/machine',{ headers: { Authorization: `Bearer ${this.getToken()}` } }).pipe(
      map(this.extractData1));
  }


  getRoute(drgid): Observable<any> {
    return this.http.get(this.API_URL+'/api/inspection/routecard/'+drgid,{ headers: { Authorization: `Bearer ${this.getToken()}` } }).pipe(
      map(this.extractData1));
  }


  getOplist(): Observable<any> {
    return this.http.get(this.API_URL+'/api/operation/data/oplist',{ headers: { Authorization: `Bearer ${this.getToken()}` } }).pipe(
      map(this.extractData1));
  }

  getincoming(): Observable<any> {
    return this.http.get(this.API_URL+'/api/operation/data/incoming',{ headers: { Authorization: `Bearer ${this.getToken()}` } }).pipe(
      map(this.extractData1));
  }

  getProcessCharacteristics(): Observable<any> {
    return this.http.get(this.API_URL+'/api/operation/data/ProcessCharacteristics',{ headers: { Authorization: `Bearer ${this.getToken()}` } }).pipe(
      map(this.extractData1));
  }

  getProductCharacteristics(): Observable<any> {
    return this.http.get(this.API_URL+'/api/operation/data/ProductCharacteristics',{ headers: { Authorization: `Bearer ${this.getToken()}` } }).pipe(
      map(this.extractData1));
  }

  addOperation(datas): Observable<any> {
    return this.http.post<any>(this.API_URL+'/api/operation/', datas,{ headers: { Authorization: `Bearer ${this.getToken()}` } }).pipe(
      map(this.extractData1));
  }

  updateOperation(id, datas): Observable<any> {
    return this.http.put<any>(this.API_URL+'/api/operation/' + id, datas,{ headers: { Authorization: `Bearer ${this.getToken()}` } }).pipe(
      map(this.extractData1));
  }

  updatePfStatus(id): Observable<any> {
    return this.http.put<any>(this.API_URL+'/api/operation/pfstatus/' + id, { headers: { Authorization: `Bearer ${this.getToken()}` } }).pipe(
      map(this.extractData1));
  }

  deleteOperation(id): Observable<any> {
    return this.http.delete(this.API_URL+'/api/operation/' + id, { headers: { Authorization: `Bearer ${this.getToken()}` } }).pipe(
      map(this.extractData1));
  }
  approval(opnNo, qpTechConfirm): Observable<any> {
    return this.http.put<any>(this.API_URL + '/api/operation/' + opnNo, qpTechConfirm, { headers: { Authorization: `Bearer ${this.getToken()}` } }).pipe(
      map(this.extractData1));
  }
  approvalMaster(opnNo, qpMasterApproval): Observable<any> {
    return this.http.put<any>(this.API_URL + '/api/operation/' + opnNo, qpMasterApproval, { headers: { Authorization: `Bearer ${this.getToken()}` } }).pipe(
      map(this.extractData1));
  }


}
