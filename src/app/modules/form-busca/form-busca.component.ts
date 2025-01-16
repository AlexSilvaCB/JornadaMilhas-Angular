import { Component, inject, OnInit } from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ContainerComponent } from '../container/container.component';
import { CardComponent } from '../card/card.component';
import { FormBuscaService } from '../../core/services/form-busca.service';
import { DropdownUfComponent } from './dropdown-uf/dropdown-uf.component';
import { FormDateComponent } from './form-date/form-date.component';
import { obterControle } from '../../core/types/functions';

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
    MatFormFieldModule,
    MatButtonModule,
    ReactiveFormsModule,
    DropdownUfComponent,
    FormDateComponent,
  ],
  templateUrl: './form-busca.component.html',
  styleUrl: './form-busca.component.scss',
})
export class FormBuscaComponent implements OnInit {
  formBuscaService = inject(FormBuscaService);
  protected obterControleOrigem!: FormControl;
  protected obterControleDestino!: FormControl;
  protected obterControleDateIda!: FormControl;
  protected obterControleDateVolta!:FormControl;

  constructor() {}

  ngOnInit(): void {
    this.obterControleOrigem = obterControle(
      'origem',
      this.formBuscaService.formBusca
    );
    this.obterControleDestino = obterControle(
      'destino',
      this.formBuscaService.formBusca
    );
    this.obterControleDateIda = obterControle(
      'dateIda',
      this.formBuscaService.formBusca
    );
    this.obterControleDateVolta = obterControle(
      'dateVolta',
      this.formBuscaService.formBusca
    );

  }

  buscar() {
    console.log(this.formBuscaService.formBusca.value);
  }
}
