import { HttpClient,HttpParams, HttpHeaders,HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable, throwError } from 'rxjs';
import { Obrazovanje } from '../models/obrazovanje';
import { PREDUZECE_URL } from '../app.constants';
import {map, catchError} from 'rxjs/operators';
import { Preduzece } from '../models/preduzece';

@Injectable({
 providedIn: 'root'


})
export class PreduzeceService {

  constructor(private httpClient: HttpClient) {  }


  public getAllPreduzece(): Observable<any>{
    return this.httpClient.get(`${PREDUZECE_URL}`);

  }

  public addPreduzece(preduzece:Preduzece):Observable<any>{
    preduzece.id=0;
    return this.httpClient.post(`${PREDUZECE_URL}`, preduzece);
  }

  public updatePreduzece(preduzece:Preduzece):Observable<any>{
    return this.httpClient.put(`${PREDUZECE_URL}`,preduzece);
  }

  public deletePreduzece(id:number):Observable<any>{
    return this.httpClient.delete(`${PREDUZECE_URL}/${id}`);
  }

}

