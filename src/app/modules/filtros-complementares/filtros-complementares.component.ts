import { Component, EventEmitter, inject, Output } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { MatIconModule } from '@angular/material/icon';
import { CompanhiasComponent } from './companhias/companhias.component';
import { ParadasComponent } from './paradas/paradas.component';
import { PrecosComponent } from './precos/precos.component';
import { FormBuscaService } from '../../core/services/form-busca.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-filtros-complementares',
  standalone: true,
  imports: [CardComponent, CompanhiasComponent, ParadasComponent, PrecosComponent ,MatIconModule, MatButtonModule],
  templateUrl: './filtros-complementares.component.html',
  styleUrl: './filtros-complementares.component.scss'
})
export class FiltrosComplementaresComponent {
  @Output() realizarBusca = new EventEmitter();
  formBuscaService = inject(FormBuscaService);

  busca(){
    if(!this.formBuscaService.formBusca.valid){
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



}
