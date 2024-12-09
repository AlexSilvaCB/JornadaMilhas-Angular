import { Component, effect, inject, OnChanges, signal, SimpleChanges } from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { ContainerComponent } from '../container/container.component';
import { CardComponent } from '../card/card.component';
import { FormBuscaService } from '../../core/services/form-busca.service';
import { DropdownUfComponent } from './dropdown-uf/dropdown-uf.component';
import { FormDateComponent } from './form-date/form-date.component';

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
    FormDateComponent
  ],
  templateUrl: './form-busca.component.html',
  styleUrl: './form-busca.component.scss',
})
export class FormBuscaComponent{
  protected formBuscaService = inject(FormBuscaService);
  protected errorForm: boolean | undefined = false

  constructor(){
  }

  insertValueFormDate(value:string, tipo: string){
    if(tipo === 'dateIda'){
      this.formBuscaService.formBusca.patchValue({dateIda:value})
      }else{
        this.formBuscaService.formBusca.patchValue({dateVolta:value})
      }

      this.errorForm = this.formBuscaService.formBusca.get(tipo)?.hasError('pattern')
  }

  buscar() {
    console.log(this.formBuscaService.formBusca.value);
  }
}
