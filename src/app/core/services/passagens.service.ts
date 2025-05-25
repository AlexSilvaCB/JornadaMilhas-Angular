import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable, take } from 'rxjs';
import { DadosBusca, Resultado } from '../types/types';

@Injectable({
  providedIn: 'root',
})
export class PassagensService {
  #apiUrl = environment.apiUrl;
  #http = inject(HttpClient);
  precoMin: number = 0;
  precoMax: number = 0;

  constructor() {}

  getPassagens(search: DadosBusca): Observable<Resultado> {
    const params = this.converterParametroString(search);
    const obs =  this.#http.get<Resultado>(this.#apiUrl + '/passagem/search?' + params);
    obs.pipe(take(1)).subscribe(res => {
      this.precoMin = res.precoMin
      this.precoMax = res.precoMax
    })
    return obs
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
