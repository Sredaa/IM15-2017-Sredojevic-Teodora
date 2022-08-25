import { HttpClient,HttpParams, HttpHeaders,HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable, throwError } from 'rxjs';
import { Obrazovanje } from '../models/obrazovanje';
import { RADNIK_URL } from '../app.constants';
import {map, catchError} from 'rxjs/operators';
import { Radnik } from '../models/radnik';

@Injectable({
 providedIn: 'root'


})
export class RadnikService {

  constructor(private httpClient: HttpClient) {  }


  public getAllRadnik(): Observable<any>{
    return this.httpClient.get(`${RADNIK_URL}`);

  }

  public addRadnik(radnik:Radnik):Observable<any>{
    radnik.id=0;
    return this.httpClient.post(`${RADNIK_URL}`, radnik);
  }

  public updateRadnik(radnik:Radnik):Observable<any>{
    return this.httpClient.put(`${RADNIK_URL}`,radnik);
  }

  public deleteRadnik(id:number):Observable<any>{
    return this.httpClient.delete(`${RADNIK_URL}/${id}`);
  }

}

