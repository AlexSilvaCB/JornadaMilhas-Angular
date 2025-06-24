import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Passagem } from '../../../core/types/types';

@Component({
  selector: 'app-passagem-destaque',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './passagem-destaque.component.html',
  styleUrl: './passagem-destaque.component.scss'
})
export class PassagemDestaqueComponent {

  @Input()destacadaPor: string = '';
  @Input()passagem?: Passagem;
  @Input()variant: 'primary' | 'secondary' | 'default'  = 'primary';

  

}
