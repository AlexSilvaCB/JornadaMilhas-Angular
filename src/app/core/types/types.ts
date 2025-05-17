export interface Promocao {
  id: number;
  destino: string;
  imagem: string;
  preco: number;
}

export interface UnidadeFederativa {
  id: number;
  nome: string;
  sigla: string;
}

export interface Depoimentos {
  id: number;
  texto: string;
  autor: string;
  avatar: string;
}

export interface ILogin {
  email: string;
  senha: string;
}

export interface PessoaUsuaria {
  nome: string;
  nascimento: string;
  cpf: string;
  telefone: string;
  email: string;
  senha: string;
  genero: string;
  cidade: string;
  estado: UnidadeFederativa;
}

export interface AuthResponse {
  access_token: string;
}

export interface Resultado {
  paginaAtual: number;
  ultimaPagina: number;
  total: number;
  precoMin: number;
  precoMax: number;
  resultado: Passagem[];
}

export interface Passagem {
  tipo: string;
  precoIda: number;
  precoVolta: number;
  taxaEmbarque: number;
  conexoes: number;
  tempoVoo: number;
  origem: UnidadeFederativa;
  destino: UnidadeFederativa;
  companhia: Companhia;
  dataIda: Date;
  dataVolta: Date;
  total: number;
  orcamento: Orcamento[];
}

export interface Companhia {
  id: string;
  nome: string;
}

export interface Orcamento {
  descricao: string;
  preco: number;
  taxaEmbarque: number;
  total: number;
}

export interface DadosBusca {
  somenteIda?: boolean;
  passageirosAdultos?: number;
  passageirosCriancas?: number;
  passageirosBebes?: number;
  tipo?: string;
  origemId?: number;
  destinoId?: number;
  precoMin?: number;
  precoMax?: number;
  conexoes?: number;
  tempoVoo?: number;
  dataIda?: string;
  dataVolta?: string;
  companhiasId?: number[];
  pagina: number;
  porPagina: number;
}

export interface OpcoesDeParada{
  display: string
  value: string
}
