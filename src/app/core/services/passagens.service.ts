import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { DadosBusca, Resultado } from '../types/types';

@Injectable({
  providedIn: 'root',
})
export class PassagensService {
  #apiUrl = environment.apiUrl;
  #http = inject(HttpClient);

  constructor() {}

  getPassagens(search: DadosBusca): Observable<Resultado> {
    const params = this.converterParametroString(search);
    return this.#http.get<Resultado>(this.#apiUrl + '/passagem/search?' + params);
  }

   converterParametroString(busca: DadosBusca){
   const query = Object.entries(busca)
   .map( ([key, value])=>{
    if(!value){
      return ''
    }
    return `${key}=${value}`
   })
   .join('&')
   return query
  }

}
