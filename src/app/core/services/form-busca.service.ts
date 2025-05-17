import { inject, Injectable } from '@angular/core';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../../modules/modal/modal.component';
import { MatChipSelectionChange } from '@angular/material/chips';
import { DadosBusca} from '../types/types';
import { UnidadeFederativaService } from './unidade-federativa.service';
import {
  dateValidator,
  dateValidatorVolta,
  estadoValidator,
  obterControle,
} from '../types/functions';

@Injectable({
  providedIn: 'root',
})
export class FormBuscaService {
  readonly dialog = inject(MatDialog);
  #fb = inject(NonNullableFormBuilder);
  #estados$ = inject(UnidadeFederativaService);

  formBusca: FormGroup = this.#fb.group({
    somenteIda: [false, [Validators.required]],
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
    tipo: ['Econômica', [Validators.required]],
    adultos: [1, [Validators.required]],
    criancas: [0],
    bebes: [0],
    dateIda: [null, [Validators.required, dateValidator()]],
    dateVolta: [null, [dateValidatorVolta('dateIda')]],
    conexoes: new FormControl(null)
  });

  alterarTipo(evento: MatChipSelectionChange, tipo: string) {
    if (evento.selected) {
      this.formBusca.patchValue({ tipo });
    }
  }

  obterDadosBusca(): DadosBusca {
    const dadosBusca: DadosBusca = {
      pagina: 1,
      porPagina: 50,
      somenteIda: this.formBusca.get('somenteIda')?.value,
      origemId: this.formBusca.get('origem')?.value.id,
      destinoId: this.formBusca.get('destino')?.value.id,
      tipo: this.formBusca.get('tipo')?.value,
      passageirosAdultos: this.formBusca.get('adultos')?.value,
      passageirosCriancas: this.formBusca.get('criancas')?.value,
      passageirosBebes: this.formBusca.get('bebes')?.value,
      dataIda: new Date(this.formBusca.get('dateIda')?.value).toISOString(),
      dataVolta: new Date(this.formBusca.get('dateVolta')?.value).toISOString(),
    };
    const conexoesControl = obterControle('conexoes', this.formBusca);
    if (conexoesControl.value) {
      dadosBusca.conexoes = conexoesControl.value
    }
    return dadosBusca;
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
