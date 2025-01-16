import { inject, Injectable } from '@angular/core';
import {
  FormControl,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';
import {
  cpfValidator,
  estadoValidator,
  formConfirmation,
} from '../types/functions';
import { UnidadeFederativa } from '../types/types';
import { UnidadeFederativaService } from './unidade-federativa.service';

@Injectable({
  providedIn: 'root',
})
export class FormBaseService {
  #fb = inject(NonNullableFormBuilder);
  #estados$ = inject(UnidadeFederativaService);

  formBase = this.#fb.group({
    nome: ['', [Validators.required]],
    nascimento: new FormControl<Date | null>(null, {
      validators: [Validators.required]}),
    cpf: ['', [Validators.required, cpfValidator()]],
    telefone: [
      '',
      [
        Validators.required,
        Validators.pattern(/^\(?\d{2}\)? ?(?:[2-8]|9[1-9])\d{3}-?\d{4}$/),
      ],
    ],
    email: [
      '',
      [
        Validators.required,
        Validators.pattern('^[a-z0-9.+-]+@[a-z0-9.-]+\\.[a-z]{2,}$'),
      ],
    ],
    senha: ['', [Validators.required, Validators.minLength(3)]],
    genero: ['outro', [Validators.required]],
    cidade: ['', [Validators.required]],
    estado: new FormControl<UnidadeFederativa | null>(null, {
      validators: [Validators.required],
      asyncValidators: [estadoValidator(this.#estados$)],
    }),
    confirmarEmail: [null, [Validators.required, formConfirmation('email')]],
    confirmarSenha: [null, [Validators.required, formConfirmation('senha')]],
    aceitarTermos: [null, [Validators.requiredTrue]],
  });
}
