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

export interface PessoaUsuaria{
  nome: string,
  nascimento: string
  cpf: string,
  telefone: string,
  email: string,
  senha: string,
  genero: string,
  cidade: string,
  estado:UnidadeFederativa
}


