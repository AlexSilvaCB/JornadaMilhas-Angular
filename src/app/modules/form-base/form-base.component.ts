import { Component, inject, Input, OnInit } from '@angular/core';
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
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarModule, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { FormBuscaService } from '../../core/services/form-busca.service';
import { ContainerComponent } from '../container/container.component';
import { cpfValidator, formConfirmation } from '../../core/types/functions';
import { FormularioService } from '../../core/services/formulario.service';
import { PessoaUsuaria, UnidadeFederativa } from '../../core/types/types';

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
export class FormBaseComponent {

  #fb = inject(NonNullableFormBuilder);
  formBuscaService = inject(FormBuscaService);
  formularioService = inject(FormularioService);
  private _snackBar = inject(MatSnackBar);

  #horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  #verticalPosition: MatSnackBarVerticalPosition = 'top';
  #durationInSeconds = 5;

  estadoControl = new FormControl<UnidadeFederativa | null>(null, [Validators.required, this.formBuscaService.estadoValidator()]);

  @Input() perfilComponent!: boolean;
  protected errorForm: boolean | undefined = false;

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
    estado:this.estadoControl,
    confirmarEmail: [null, [Validators.required, formConfirmation('email')]],
    confirmarSenha: [null, [Validators.required, formConfirmation('senha')]],
    aceitarTermos: [null, [Validators.requiredTrue]],
  });


  insertValueFormDate(value: string, tipo: string) {
    if (tipo === 'nascimento') {
      this.formBase.patchValue({ nascimento: value });
    }
  }

  sendCadastro() {
    const formatada:PessoaUsuaria = this.mapFormData(this.formBase.value);
    this.formularioService.cadastrar(formatada).subscribe({
      next:(value)=>{
        this.okSnackBar(1);
      },
      error:(err)=>{
        console.log(err)
        this.okSnackBar(2)
      }
    })
    console.log(formatada);
  }

  mapFormData(formValue: any): PessoaUsuaria {
    const fieldsToInclude: Array<keyof PessoaUsuaria> = [
      'nome',
      'nascimento',
      'cpf',
      'telefone',
      'email',
      'senha',
      'genero',
      'cidade',
      'estado',
    ];

    return fieldsToInclude.reduce((obj, key) => {
      obj[key] = formValue[key];
      return obj;
    }, {} as PessoaUsuaria);
  }

  okSnackBar(returnForm: number) {
    if(returnForm === 1){
      this._snackBar.open('Cadastro realizado com sucesso!!', 'Fechar', {
        horizontalPosition: this.#horizontalPosition,
        verticalPosition: this.#verticalPosition,
        duration: this.#durationInSeconds * 1000,
      });
    }

    if(returnForm === 2){
      this._snackBar.open('Não foi possivel realizar o cadastro!!', 'Fechar', {
        horizontalPosition: this.#horizontalPosition,
        verticalPosition: this.#verticalPosition,
        duration: this.#durationInSeconds * 1000,
      });
    }
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
