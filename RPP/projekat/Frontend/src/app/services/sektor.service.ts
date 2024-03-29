import { HttpClient,HttpParams, HttpHeaders,HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable, throwError } from 'rxjs';
import { SEKTOR_URL } from '../app.constants';
import {map, catchError} from 'rxjs/operators';
import { Sektor } from '../models/sektor';

@Injectable({
 providedIn: 'root'


})
export class SektorService {

  constructor(private httpClient: HttpClient) {  }


  public getAllSektor(): Observable<any>{
    return this.httpClient.get(`${SEKTOR_URL}`);

  }

  public addSektor(sektor:Sektor):Observable<any>{
   sektor.id=0;
    return this.httpClient.post(`${SEKTOR_URL}`,sektor);
  }

  public updateSektor(sektor:Sektor):Observable<any>{
    return this.httpClient.put(`${SEKTOR_URL}`,sektor);
  }

  public deleteSektor(id:number):Observable<any>{
    return this.httpClient.delete(`${SEKTOR_URL}/${id}`);
  }

}
