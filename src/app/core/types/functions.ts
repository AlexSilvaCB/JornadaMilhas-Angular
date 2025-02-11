import { AbstractControl, AsyncValidatorFn, FormControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms'
import { PessoaUsuaria, UnidadeFederativa } from './types';
import { catchError, map, Observable, of } from 'rxjs';
import { UnidadeFederativaService } from '../services/unidade-federativa.service';

export function cpfValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const cpf = control.value;
    if (!cpf || !/^\d+$/.test(cpf)) {
      return { cpfInvalido: 'CPF_numeros' };
    }
      if (!isValidCPF(cpf)) {
        return { cpfInvalido: 'CPF_invalido' };
      }
      return null;
    };
  }

  function isValidCPF(cpf: string): boolean {
    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
      return false;
    }
    let sum = 0;
    let remainder;

    for (let i = 1; i <= 9; i++) {
      sum += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }
    remainder = (sum * 10) % 11;
    if ((remainder === 10) || (remainder === 11)) {
      remainder = 0;
    }
    if (remainder !== parseInt(cpf.substring(9, 10))) {
      return false;
    }
    sum = 0;
    for (let i = 1; i <= 10; i++) {
      sum += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    }
    remainder = (sum * 10) % 11;

    if ((remainder === 10) || (remainder === 11)) {
      remainder = 0;
    }

    if (remainder !== parseInt(cpf.substring(10, 11))) {
      return false;
    }
    return true;
    }

    export function dateValidator(): ValidatorFn {
      return (control: AbstractControl): { [key: string]: any } | null => {

        if(control.value === null){
          return null
        }
        const inputDate = new Date(control.value).getDate();
        console.log(control.value)
        const currentDate = new Date().getDate();

        if (inputDate < currentDate) {
          return { 'invalidDate': { value: control.value } };
        }
        return null;
      };
    }

    export function dateValidatorVolta(dados: string): ValidatorFn {
      return (control: AbstractControl): { [key: string]: any } | null => {

        if(control.value === null){
          return null
        }

        const inputIda = new Date(control.root.get(dados)?.value).getDate()
        const inputDate = new Date(control.value).getDate();
        const currentDate = new Date().getDate();

        if (inputDate < currentDate || inputDate <= inputIda) {
          return { 'invalidDate': { value: control.value } };
        }
        return null;
      };
    }


  export function obterControle<T>(nome: string, form: FormGroup): FormControl {
        const control = form.get(nome);
        if (!control) {
          throw new Error(`FormControl com nome "${nome}" não existe.`);
        }
        return control as FormControl<T>;
      }

  export function estadoValidator(Uf: UnidadeFederativaService): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      const valueUF: UnidadeFederativa | null = control.value;
      if (valueUF === null) {
        return of(null);
      }
      return Uf.listar().pipe(
        map((estados) => {
          const isValid = estados.some((uf) => uf.nome === valueUF.nome);
          return isValid ? null : { estadoInvalido: true };
        }),
        catchError(() => of({ estadoInvalido: true }))
      );
    };
  }


    export function formConfirmation(dados: string): ValidatorFn {
      return (control: AbstractControl): ValidationErrors | null => {
        const passwordValue = control.value;
        const confirmPasswordValue = control.root.get(dados)?.value;
        if (passwordValue !== confirmPasswordValue) {
          return { passwordConfirmation: true };
        }
        return null;
      };
    }

    export function mapFormData(formValue: any): PessoaUsuaria {
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
