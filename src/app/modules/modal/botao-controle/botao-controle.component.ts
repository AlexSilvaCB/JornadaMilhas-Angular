import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-botao-controle',
  standalone: true,
  imports: [MatButtonModule, NgClass],
  templateUrl: './botao-controle.component.html',
  styleUrl: './botao-controle.component.scss'
})
export class BotaoControleComponent {
  @Input()operacao: 'incremento' | 'decremento' = 'incremento'
  @Input()src:string = ''
  @Input()alt:string = ''

}
