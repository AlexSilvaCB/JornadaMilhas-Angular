import { Component } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-filtros-complementares',
  standalone: true,
  imports: [CardComponent, MatIconModule],
  templateUrl: './filtros-complementares.component.html',
  styleUrl: './filtros-complementares.component.scss'
})
export class FiltrosComplementaresComponent {

}
