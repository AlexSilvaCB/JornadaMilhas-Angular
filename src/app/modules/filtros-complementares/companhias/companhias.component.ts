import { Component, inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CompanhiaService } from '../../../core/services/companhia.service';
import { FormBuscaService } from '../../../core/services/form-busca.service';
import { Companhia } from '../../../core/types/types';
import { obterControle } from '../../../core/types/functions';
import { LabelComponent } from '../../label/label.component';

@Component({
  selector: 'app-companhias',
  standalone: true,
  imports: [MatCheckboxModule, LabelComponent],
  templateUrl: './companhias.component.html',
  styleUrl: './companhias.component.scss'
})
export class CompanhiasComponent implements OnInit {

  companhias: Companhia[] = [];
  selecionadas: Companhia[] = [];

  companhiasControl!: FormControl<number[] | null>

  #companhiaService = inject(CompanhiaService)
  #formBuscaService = inject(FormBuscaService)

  constructor() {}

  ngOnInit(): void {
    this.companhiasControl = obterControle<number[]>('companhias', this.#formBuscaService.formBusca);

    this.#companhiaService.listar().subscribe(
      res => {
        this.companhias = res;
      }
    )

    this.companhiasControl.valueChanges.subscribe(value => {
      console.log(value)
      if (!value) {
        this.selecionadas = []
      }
    })
  }

  alternarCompanhia(companhia: Companhia, checked: boolean): void {
    console.log(companhia)
    console.log(checked)
    if (!checked) {
      this.selecionadas = this.selecionadas.filter(comp => comp != companhia)
    } else {
      this.selecionadas.push(companhia)
    }
    this.#formBuscaService.formBusca.patchValue({
      companhias: this.selecionadas.map(comp => Number(comp.id))
    })
  }

  companhiaSelecionada(companhia: Companhia): boolean {
    console.log(companhia)

    return this.selecionadas.includes(companhia)
  }

}
