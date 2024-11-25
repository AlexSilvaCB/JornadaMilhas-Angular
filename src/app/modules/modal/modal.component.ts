import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatChipsModule } from '@angular/material/chips';
import { FormBuscaService } from '../../core/services/form-busca.service';
import { SeletorPassageiroComponent } from './seletor-passageiro/seletor-passageiro.component';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
    MatButtonModule,
    MatChipsModule,
    SeletorPassageiroComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent {
  protected formBuscaService = inject(FormBuscaService);
}
