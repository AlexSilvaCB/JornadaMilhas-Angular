import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, shareReplay, tap, throwError } from 'rxjs';
import { Depoimentos } from '../types/types';

@Injectable({
  providedIn: 'root'
})
export class DepoimentoService {
  apiUrl = environment.apiUrl;
  http = inject(HttpClient)

  constructor() { }

  listarDepoimento$():Observable<Depoimentos[]>{
    return this.http.get<Depoimentos[]>(`${this.apiUrl}/depoimentos`).pipe(
      shareReplay(),
      tap((res)=>(res)),
      catchError((error) =>{
        return throwError(()=>error);
  })
 )}

}
