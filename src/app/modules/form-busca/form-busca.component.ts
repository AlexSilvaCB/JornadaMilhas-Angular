import { Component, inject } from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';

import { ContainerComponent } from '../container/container.component';
import { CardComponent } from '../card/card.component';
import { ModalComponent } from '../modal/modal.component';
import { FormBuscaService } from '../../core/services/form-busca.service';
import { DropdownUfComponent } from './dropdown-uf/dropdown-uf.component';



@Component({
  selector: 'app-form-busca',
  standalone: true,
  imports: [ContainerComponent, CardComponent, MatButtonToggleModule, MatChipsModule, MatIconModule, MatInputModule, MatDatepickerModule, MatFormFieldModule, MatNativeDateModule, MatButtonModule, ReactiveFormsModule, DropdownUfComponent],
  templateUrl: './form-busca.component.html',
  styleUrl: './form-busca.component.scss'
})
export class FormBuscaComponent {
  readonly dialog = inject(MatDialog);
 formBuscaService = inject(FormBuscaService)

  openDialog() {
    this.dialog.open(ModalComponent);
  }


}
