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
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormDateComponent } from '../form-busca/form-date/form-date.component';
import { MatRadioModule } from '@angular/material/radio';
import { MatDividerModule } from '@angular/material/divider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { JsonPipe } from '@angular/common';
import { DropdownUfComponent } from '../form-busca/dropdown-uf/dropdown-uf.component';
import { FormBuscaService } from '../../core/services/form-busca.service';
import { ContainerComponent } from '../container/container.component';
import { cpfValidator, formConfirmation } from '../../core/types/functions';
import { UnidadeFederativa } from '../../core/types/types';
import { FormularioService } from '../../core/services/formulario.service';

@Component({
  selector: 'app-form-base',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    MatIconModule,
    MatRadioModule,
    MatDividerModule,
    MatCheckboxModule,
    FormDateComponent,
    JsonPipe,
    DropdownUfComponent,
    ContainerComponent,
  ],
  templateUrl: './form-base.component.html',
  styleUrl: './form-base.component.scss',
})
export class FormBaseComponent implements OnInit{

  @Input() perfilComponent!: boolean;
  @Output() formBaseOutput: EventEmitter<any> = new EventEmitter<any>();

  #fb = inject(NonNullableFormBuilder);
  #formBuscaService = inject(FormBuscaService);
  #formularioService = inject(FormularioService);

  protected errorForm: boolean | undefined = false;

  protected estadoControl = new FormControl<UnidadeFederativa | null>(null, [
    Validators.required,
    this.#formBuscaService.estadoValidator(),
  ]);

  ngOnInit(): void {
    this.#formularioService.setCadastro(this.formBase)
  }

  protected formBase = this.#fb.group({
    nome: ['', [Validators.required]],
    nascimento: [
      '',
      [
        Validators.required,
        Validators.pattern(
          /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/
        ),
      ],
    ],
    cpf: ['', [Validators.required, cpfValidator()]],
    telefone: [
      '',
      [
        Validators.required,
        Validators.pattern(/^\(?\d{2}\)? ?(?:[2-8]|9[1-9])\d{3}-?\d{4}$/),
      ],
    ],
    email: [
      '',
      [
        Validators.required,
        Validators.pattern('^[a-z0-9.+-]+@[a-z0-9.-]+\\.[a-z]{2,}$'),
      ],
    ],
    senha: ['', [Validators.required, Validators.minLength(3)]],
    genero: ['outro', [Validators.required]],
    cidade: ['', [Validators.required]],
    estado: this.estadoControl,
    confirmarEmail: [null, [Validators.required, formConfirmation('email')]],
    confirmarSenha: [null, [Validators.required, formConfirmation('senha')]],
    aceitarTermos: [null, [Validators.requiredTrue]],
  });

  insertValueFormDate(value: string, tipo: string) {
    if (tipo === 'nascimento') {
      this.formBase.patchValue({ nascimento: value });
    }
  }

  executarAcao() {
    this.formBaseOutput.emit();
  }

  //substituido por estadoControl
  obterControleBase(nome: string): FormControl {
    const control = this.formBase.get(nome);
    if (!control) {
      throw new Error(`FormControl com nome "${nome}" não existe.`);
    }
    return control as FormControl;
  }
}
