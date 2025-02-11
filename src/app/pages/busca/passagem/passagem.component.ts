import { Component, Input } from '@angular/core';
import { Passagem } from '../../../core/types/types';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-passagem',
  standalone: true,
  imports: [MatCardModule, CommonModule, MatButtonModule],
  templateUrl: './passagem.component.html',
  styleUrl: './passagem.component.scss'
})
export class PassagemComponent {
  @Input() passagem!: Passagem[];
}
