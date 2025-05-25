import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { LabelComponent } from '../../label/label.component';
import { MatSliderModule } from '@angular/material/slider';
import { PassagensService } from '../../../core/services/passagens.service';
import { FormBuscaService } from '../../../core/services/form-busca.service';
import { obterControle } from '../../../core/types/functions';


@Component({
  selector: 'app-precos',
  standalone: true,
  imports: [ReactiveFormsModule, LabelComponent, CommonModule, MatSliderModule],
  templateUrl: './precos.component.html',
  styleUrl: './precos.component.scss'
})
export class PrecosComponent implements OnInit{

  precoMin!: FormControl<number | null>;
  precoMax!: FormControl<number | null>;

  passagemService = inject(PassagensService);
  #formBuscaService = inject(FormBuscaService);

  ngOnInit(): void {
    this.precoMin = obterControle<number>('precoMin', this.#formBuscaService.formBusca)
    this.precoMax = obterControle<number>('precoMax', this.#formBuscaService.formBusca)
  }

}
