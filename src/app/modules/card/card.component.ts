import { Component, Input } from '@angular/core';
import { ContainerComponent } from '../container/container.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, ContainerComponent],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {

  @Input() variant: 'primary' | 'secondary' = 'primary'

}
