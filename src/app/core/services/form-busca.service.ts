import { inject, Injectable } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  NonNullableFormBuilder,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../../modules/modal/modal.component';
import { MatChipSelectionChange } from '@angular/material/chips';
import { UnidadeFederativa } from '../types/types';

@Injectable({
  providedIn: 'root',
})
export class FormBuscaService {
  readonly dialog = inject(MatDialog);
  #fb = inject(NonNullableFormBuilder);

  inputListValidator: UnidadeFederativa[] = [];

  formBusca = this.#fb.group({
    formaViagem: ['', [Validators.required]],
    origem: [null, [Validators.required, this.estadoValidator()]],
    destino: [null, [Validators.required, this.estadoValidator()]],
    tipo: ['', [Validators.required]],
    adultos: [0, [Validators.required]],
    criancas: [0],
    bebes: [0],
    dateIda: [
      '',
      [
        Validators.required,
        Validators.pattern(
          /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/
        ),
      ],
    ],
    dateVolta: [
      '',
      [
        Validators.required,
        Validators.pattern(
          /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/
        ),
      ],
    ],
  });

  constructor() {}

  obterControle(nome: string): FormControl {
    const control = this.formBusca.get(nome);
    if (!control) {
      throw new Error(`FormControl com nome "${nome}" não existe.`);
    }
    return control as FormControl;
  }

  alterarTipo(evento: MatChipSelectionChange, tipo: string) {
    if (evento.selected) {
      this.formBusca.patchValue({ tipo });
    }
  }

  getDescricaoPassageiros(): string {
    let descricao: string = '';

    const adultos = this.formBusca.get('adultos')?.value;
    if (adultos && adultos > 0) {
      descricao += `${adultos} Adulto${adultos > 1 ? 's ' : ' '}`;
    }

    const criancas = this.formBusca.get('criancas')?.value;
    if (criancas && criancas > 0) {
      descricao += ` ${criancas} Criança${criancas > 1 ? 's ' : ' '}`;
    }

    const bebes = this.formBusca.get('bebes')?.value;
    if (bebes && bebes > 0) {
      descricao += `${bebes} Bebê${bebes > 1 ? 's ' : ' '}`;
    }

    return descricao;
  }

  openDialog() {
    this.dialog.open(ModalComponent);
  }

  estadoValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const estados: UnidadeFederativa[] = this.inputListValidator;
      const isValid = estados.some((estado) => estado === control.value);
      return isValid ? null : { estadoInvalido: { value: control.value } };
    };
  }
}
