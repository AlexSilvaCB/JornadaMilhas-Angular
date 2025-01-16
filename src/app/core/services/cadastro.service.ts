import { HttpClient } from '@angular/common/http';
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

  buscarCadastro(): Observable<PessoaUsuaria> {
    return this.#htpp
      .get<PessoaUsuaria>(`${this.#apiUrl}/auth/perfil`)
      .pipe(
        shareReplay(),
        tap((res) => {
        })
      );
  }

  editarCadastro(pessoaUsuaria: PessoaUsuaria): Observable<PessoaUsuaria> {
    return this.#htpp
      .patch<PessoaUsuaria>(`${this.#apiUrl}/auth/perfil`, pessoaUsuaria)
      .pipe(
        shareReplay(),
        tap((res) => res)
      );
  }
}
