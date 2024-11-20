import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Observable, shareReplay, tap } from 'rxjs';
import { Promocao } from '../types/types';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PromocaoService {

  #httpClient = inject(HttpClient);
  #apiUrl: string = environment.apiUrl

  constructor() {}

  public listar$():Observable<Promocao[]>{
    return this.#httpClient.get<Promocao[]>(`${this.#apiUrl}/promocoes`).pipe(
      shareReplay(),
      tap((res) => (res)),
      tap((res) => console.log(res))
    )
  }
}
