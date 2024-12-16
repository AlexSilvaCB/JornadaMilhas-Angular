import { Injectable } from '@angular/core';

const KEY = 'token';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  salvarToken(token: string) {
    return localStorage.setItem(KEY, token)
  }

  excluirToken() {
    localStorage.removeItem(KEY)
  }

  // ?? caso não tenha nada para retornar 
  retornarToken() {
    return localStorage.getItem(KEY) ?? ''
  }

  //!! converte em boleano
  possuiToken() {
    return !!this.retornarToken();
  }
}
