import { Component, EventEmitter, inject, Output } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { MatIconModule } from '@angular/material/icon';
import { CompanhiasComponent } from './companhias/companhias.component';
import { ParadasComponent } from './paradas/paradas.component';
import { PrecosComponent } from './precos/precos.component';
import { FormBuscaService } from '../../core/services/form-busca.service';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { PassagensService } from '../../core/services/passagens.service';

@Component({
  selector: 'app-filtros-complementares',
  standalone: true,
  imports: [CardComponent, CompanhiasComponent, ParadasComponent, PrecosComponent, MatIconModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './filtros-complementares.component.html',
  styleUrl: './filtros-complementares.component.scss'
})
export class FiltrosComplementaresComponent {
  @Output() realizarBusca = new EventEmitter();
  formBuscaService = inject(FormBuscaService);
  #passagemService = inject(PassagensService);

  busca(){
    if(!this.formBuscaService.formBusca.valid){
      console.log(this.formBuscaService.formBusca.markAllAsTouched())
        this.formBuscaService.formBusca.markAllAsTouched()
        window.scroll({
          top:0,
          left:0,
          behavior:'smooth'
        })
        return
    }
    this.realizarBusca.emit(this.formBuscaService.obterDadosBusca())
  }

  limparFiltros(){
    this.formBuscaService.formBusca.patchValue({
      conexoes: null,
      companhias:null,
      precoMin: this.#passagemService.precoMin,
      precoMax: this.#passagemService.precoMax,
    })
  }

}
