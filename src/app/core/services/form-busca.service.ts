import { inject, Injectable } from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../../modules/modal/modal.component';
import { MatChipSelectionChange } from '@angular/material/chips';
import { UnidadeFederativa } from '../types/types';
import { UnidadeFederativaService } from './unidade-federativa.service';
import { catchError, map, Observable, of } from 'rxjs';
import { dateValidator, dateValidatorVolta, estadoValidator } from '../types/functions';

@Injectable({
  providedIn: 'root',
})
export class FormBuscaService {
  readonly dialog = inject(MatDialog);
  #fb = inject(NonNullableFormBuilder);
  #estados$ = inject(UnidadeFederativaService);

  formBusca: FormGroup = this.#fb.group({
    formaViagem: ['', [Validators.required]],
    origem: [
      null,
      {
        validators: [Validators.required],
        asyncValidators: [estadoValidator(this.#estados$)],
      },
    ],
    destino: [
      null,
      {
        validators: [Validators.required],
        asyncValidators: [estadoValidator(this.#estados$)],
      },
    ],
    tipo: ['', [Validators.required]],
    adultos: [0, [Validators.required]],
    criancas: [0],
    bebes: [0],
    dateIda: [
      null,
      [
        Validators.required, dateValidator(),
      ],
    ],
    dateVolta: [
      null,
      [
        Validators.required, dateValidatorVolta('dateIda'),
      ],
    ],
  });

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
}
