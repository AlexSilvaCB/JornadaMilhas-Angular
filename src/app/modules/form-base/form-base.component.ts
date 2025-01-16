import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MatDatepickerModule
} from '@angular/material/datepicker';
import {
  MatNativeDateModule,
} from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatDividerModule } from '@angular/material/divider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { JsonPipe } from '@angular/common';
import { DropdownUfComponent } from '../form-busca/dropdown-uf/dropdown-uf.component';
import { ContainerComponent } from '../container/container.component';
import { FormularioService } from '../../core/services/formulario.service';
import { FormBaseService } from '../../core/services/form-base';
import { obterControle } from '../../core/types/functions';
import { FormDateComponent } from '../form-busca/form-date/form-date.component';

@Component({
  selector: 'app-form-base',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
   // MatDatepickerModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    MatIconModule,
    MatRadioModule,
    MatDividerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    JsonPipe,
    DropdownUfComponent,
    ContainerComponent,
    FormDateComponent,
  ],
  templateUrl: './form-base.component.html',
  styleUrl: './form-base.component.scss',
})
export class FormBaseComponent implements OnInit {

  @Input() perfilComponent!: boolean;
  @Input() titulo: string = 'Crie sua conta';
  @Input() textoBotao: string = 'CADASTRAR';
  @Output() acaoClique: EventEmitter<any> = new EventEmitter<any>();
  @Output() sair: EventEmitter<any> = new EventEmitter<any>();

  formEstado!:FormControl;
  dateNascimento!: FormControl
  #formularioService = inject(FormularioService);
  //protected errorForm: boolean | undefined = false;
  formBaseService = inject(FormBaseService)

  ngOnInit(): void {
    this.formEstado = obterControle('estado', this.formBaseService.formBase)
    this.dateNascimento = obterControle('nascimento', this.formBaseService.formBase)

    if (this.perfilComponent) {
      this.formBaseService.formBase.get('aceitarTermos')?.setValidators(null);
    } else {
      this.formBaseService.formBase
        .get('aceitarTermos')
        ?.setValidators([Validators.requiredTrue]);
    }

    this.formBaseService.formBase.get('aceitarTermos')?.updateValueAndValidity();

    this.#formularioService.setCadastro(this.formBaseService.formBase);
  }

  executarAcao() {
    this.acaoClique.emit();
  }

  deslogar() {
    this.sair.emit();
  }

}
