import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ILogin } from '../types/types';
import { Observable, shareReplay, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  #apiUrl = environment.apiUrl
  #http = inject(HttpClient)

  constructor() { }

  autenticar$(dadosLogin: ILogin):Observable<ILogin>{
    return this.#http.post<ILogin>(`${this.#apiUrl}/auth/login`, dadosLogin).pipe(
      shareReplay(),
      tap((res)=>(res))
    )
  }
}
