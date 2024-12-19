import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { PessoaUsuaria } from '../types/types';
import { Observable, shareReplay, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CadastroService {
  #htpp = inject(HttpClient);
  #apiUrl = environment.apiUrl;

  constructor() {}

  cadastrar(pessoaUsuaria: PessoaUsuaria): Observable<PessoaUsuaria> {
    return this.#htpp
      .post<PessoaUsuaria>(`${this.#apiUrl}/auth/cadastro`, pessoaUsuaria)
      .pipe(
        shareReplay(),
        tap((res) => res)
      );
  }

  buscarCadastro(token: string): Observable<PessoaUsuaria> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`});

    return this.#htpp
      .get<PessoaUsuaria>(`${this.#apiUrl}/auth/perfil`, { headers })
      .pipe(
        shareReplay(),
        tap((res) => {
          console.log(res);
        })
      );
  }

  editarCadastro(pessoaUsuaria: PessoaUsuaria, token: string): Observable<PessoaUsuaria> {
    const headers = new HttpHeaders({Authorization: `Bearer ${token}`});

    return this.#htpp
      .patch<PessoaUsuaria>(`${this.#apiUrl}/auth/perfil`, pessoaUsuaria, {headers})
      .pipe(
        shareReplay(),
        tap((res) => res)
      );
  }
}
