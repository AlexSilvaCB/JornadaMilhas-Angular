import { Component } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { MatIconModule } from '@angular/material/icon';
import { CompanhiasComponent } from './companhias/companhias.component';
import { ParadasComponent } from './paradas/paradas.component';
import { PrecosComponent } from './precos/precos.component';

@Component({
  selector: 'app-filtros-complementares',
  standalone: true,
  imports: [CardComponent, CompanhiasComponent, ParadasComponent, PrecosComponent ,MatIconModule],
  templateUrl: './filtros-complementares.component.html',
  styleUrl: './filtros-complementares.component.scss'
})
export class FiltrosComplementaresComponent {

}
