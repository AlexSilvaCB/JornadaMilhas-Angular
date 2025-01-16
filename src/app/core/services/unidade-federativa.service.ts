import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { catchError, Observable, of, shareReplay, tap} from 'rxjs';
import { UnidadeFederativa } from '../types/types';

@Injectable({
  providedIn: 'root'
})
export class UnidadeFederativaService {

  private http = inject(HttpClient);
  private apiUrl: string = environment.apiUrl;
  private cache$?: Observable<UnidadeFederativa[]>;

  constructor() { }

  listar():Observable<UnidadeFederativa[]>{
    if (!this.cache$) {
      this.cache$ = this.requestEstados$().pipe(
      shareReplay(1)),
      catchError(error => {
        alert("Erro ao buscar estados.")
        return of([] as UnidadeFederativa[])
      })
    }
    return this.cache$;
  }

  private requestEstados$():Observable<UnidadeFederativa[]> {
    return this.http.get<UnidadeFederativa[]>(`${this.apiUrl}/estados`)
  }

}
