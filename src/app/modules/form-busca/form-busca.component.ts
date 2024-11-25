import { Component, inject, signal } from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { ContainerComponent } from '../container/container.component';
import { CardComponent } from '../card/card.component';
import { FormBuscaService } from '../../core/services/form-busca.service';
import { DropdownUfComponent } from './dropdown-uf/dropdown-uf.component';

@Component({
  selector: 'app-form-busca',
  standalone: true,
  imports: [
    ContainerComponent,
    CardComponent,
    MatButtonToggleModule,
    MatCheckboxModule,
    MatChipsModule,
    MatIconModule,
    MatInputModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatButtonModule,
    ReactiveFormsModule,
    DropdownUfComponent,
  ],
  templateUrl: './form-busca.component.html',
  styleUrl: './form-busca.component.scss',
})
export class FormBuscaComponent {
  protected formBuscaService = inject(FormBuscaService);

  buscar() {
    console.log(this.formBuscaService.formBusca.value);
  }
}
