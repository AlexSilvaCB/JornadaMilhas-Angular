import { inject, Injectable } from '@angular/core';
import {
  FormControl,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../../modules/modal/modal.component';
import { MatChipSelectionChange } from '@angular/material/chips';

@Injectable({
  providedIn: 'root',
})
export class FormBuscaService {
  readonly dialog = inject(MatDialog);
  #fb = inject(NonNullableFormBuilder);

  contAdulto: number = 1;
  contCrianca: number = 0;
  contBebe: number = 0;

  valuePessoa: number = 0

  formBusca = this.#fb.group({
    formaViagem: ['', [Validators.required]],
    origem: [null, [Validators.required]],
    destino: [null, [Validators.required]],
    tipo: ['Econômica', [Validators.required]],
    adultos: [this.contAdulto, [Validators.required]],
    criancas: [0],
    bebes: [0],
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
}
