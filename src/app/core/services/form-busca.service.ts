import { inject, Injectable } from '@angular/core';
import { FormControl, NonNullableFormBuilder, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormBuscaService {

  #fb = inject(NonNullableFormBuilder);

  formBusca = this.#fb.group({
    formaViagem:['',[
      Validators.required]],
    origem:[null,[
      Validators.required]],
    destino:[null,[
        Validators.required]]
  })


  constructor() {
   }

   obterControle(nome:string): FormControl {
    const control = this.formBusca.get(nome);
    if (!control) {
      throw new Error(`FormControl com nome "${nome}" não existe.`);
    }
    return control as FormControl;
  }
}
