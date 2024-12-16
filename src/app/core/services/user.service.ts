import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PessoaUsuaria } from '../types/types';
import { TokenService } from './token.service';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class UserService {

 #userSubject = new BehaviorSubject<PessoaUsuaria | null>(null);
 #tokenService = inject(TokenService)

  constructor() {
    if(this.#tokenService.possuiToken()) {
      this.#decodificarJWT();
    }
  }

  #decodificarJWT() {
    const token = this.#tokenService.retornarToken();
    const user = jwtDecode(token) as PessoaUsuaria;
    this.#userSubject.next(user);
  }

  retornarUser() {
    return this.#userSubject.asObservable();
  }

  salvarToken(token: string) {
    this.#tokenService.salvarToken(token);
    this.#decodificarJWT();
  }

  logout() {
    this.#tokenService.excluirToken();
    this.#userSubject.next(null);
  }

  estaLogado() {
    return this.#tokenService.possuiToken();
  }


}
