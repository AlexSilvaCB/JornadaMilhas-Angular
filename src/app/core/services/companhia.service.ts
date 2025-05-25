import { inject, Injectable } from '@angular/core';
import { Observable, shareReplay, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Companhia } from '../types/types';

@Injectable({
  providedIn: 'root'
})
export class CompanhiaService {

   #apiUrl: string = environment.apiUrl;
   #httpClient = inject(HttpClient)

  constructor(){}

  listar():Observable<Companhia[]> {
    return this.#httpClient.get<Companhia[]>(`${this.#apiUrl}/companhias`)
    .pipe(
      shareReplay(),
      tap((res)=> (res))
    )
  }

}
