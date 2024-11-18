import { Component } from '@angular/core';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-card-depoimento',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './card-depoimento.component.html',
  styleUrl: './card-depoimento.component.scss'
})
export class CardDepoimentoComponent {

  depoimento: string = `
  Recomendo fortemente a agência de viagens Jornada.
  Eles oferecem um serviço personalizado e de alta qualidade
  que excedeu minhas expectativas em minha última viagem.
`
autoria: string = 'Mariana Faustino'

}
