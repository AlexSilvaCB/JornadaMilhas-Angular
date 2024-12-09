import { Component, inject, Input } from '@angular/core';
import { AbstractControl, FormControl, FormsModule, NonNullableFormBuilder, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormDateComponent } from "../form-busca/form-date/form-date.component";
import { MatRadioModule } from '@angular/material/radio';
import { MatDividerModule } from '@angular/material/divider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { cpfValidator } from '../../core/types/types';
import { JsonPipe } from '@angular/common';
import { DropdownUfComponent } from "../form-busca/dropdown-uf/dropdown-uf.component";
import { FormBuscaService } from '../../core/services/form-busca.service';
import { ContainerComponent } from "../container/container.component";

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
    ContainerComponent
],
  templateUrl: './form-base.component.html',
  styleUrl: './form-base.component.scss',
})
export class FormBaseComponent {
  #fb = inject(NonNullableFormBuilder);
  formBuscaService = inject(FormBuscaService);

  @Input() perfilComponent!:boolean
  protected errorForm: boolean | undefined = false

 protected formBase = this.#fb.group({
  nome:['', [Validators.required]],
  nascimento:['', [Validators.required, Validators.pattern(
    /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/
  )]],
  cpf:['', [Validators.required, cpfValidator()]],
  telefone:['', [Validators.required, Validators.pattern(/^\(?\d{2}\)? ?(?:[2-8]|9[1-9])\d{3}-?\d{4}$/)]],
  email:['',[Validators.required, Validators.pattern('^[a-z0-9.+-]+@[a-z0-9.-]+\\.[a-z]{2,}$')]],
  senha:['', [Validators.required, Validators.maxLength(3), Validators.minLength(3)]],
  genero:['outro', [Validators.required]],
  cidade:['', [Validators.required]],
  estado: this.#fb.group({
    id:[0, [Validators.required]],
    nome:['', [Validators.required, this.formBuscaService.estadoValidator()]],
    sigla:['', [Validators.required]]
  }),
 confirmarEmail: [null, [Validators.required, Validators.pattern('^[a-z0-9.+-]+@[a-z0-9.-]+\\.[a-z]{2,}$')]],
 confirmarSenha: [null, [Validators.required, Validators.minLength(3)]],
 aceitarTermos: [null, [Validators.requiredTrue]]
 })

 obterControleBase(nome: string): FormControl {
  const control = this.formBase.get('estado')?.get(nome);
  if (!control) {
    throw new Error(`FormControl com nome "${nome}" não existe.`);
  }
  return control as FormControl;
}

insertValueFormDate(value:string, tipo:string){
  if(tipo === 'nascimento') {this.formBase.patchValue({nascimento:value})}

    this.errorForm = this.formBase.get(tipo)?.hasError('pattern')
    console.log(this.errorForm)
}

 }

