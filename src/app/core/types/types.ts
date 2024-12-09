import { AbstractControl, FormControl, FormGroup, ValidatorFn } from '@angular/forms'

export interface Promocao{
  id:number,
  destino:string,
  imagem:string,
  preco:number
}

export interface UnidadeFederativa{
    id: number,
    nome:string,
    sigla: string
}

export interface Depoimentos{
  id: number,
  texto:string,
  autor:string,
  avatar:string
}

export interface ILogin{
  email:string,
  senha:string
}

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
