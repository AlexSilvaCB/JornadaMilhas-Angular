import { HttpClient, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { AuthResponse, ILogin } from '../types/types';
import { Observable, shareReplay, tap } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  #apiUrl = environment.apiUrl
  #http = inject(HttpClient)
  #userService = inject(UserService)

  constructor() { }

  autenticar$(dadosLogin: ILogin):Observable<HttpResponse<AuthResponse>>{
    return this.#http.post<AuthResponse>(`${this.#apiUrl}/auth/login`, dadosLogin, {observe:'response'}).pipe(
      shareReplay(),
      tap((res)=>{
        const authToken = res.body?.access_token || '';
        this.#userService.salvarToken(authToken);
      })
    )
  }
}
