import { Component, inject, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { FormBuscaComponent } from '../../modules/form-busca/form-busca.component';
import { ContainerComponent } from '../../modules/container/container.component';
import { HeaderComponent } from "../../modules/header/header.component";
import { FooterComponent } from "../../modules/footer/footer.component";
import { PassagensService } from '../../core/services/passagens.service';
import { DadosBusca, Destaques, Passagem } from '../../core/types/types';
import { FormBuscaService } from '../../core/services/form-busca.service';
import { PassagemComponent } from '../../modules/passagem/passagem.component';
import { FiltrosComplementaresComponent } from "../../modules/filtros-complementares/filtros-complementares.component";
import { PassagemDestaqueComponent } from '../../modules/passagem/passagem-destaque/passagem-destaque.component';
import { CardComponent } from "../../modules/card/card.component";

@Component({
  selector: 'app-busca',
  standalone: true,
  imports: [FormBuscaComponent, ContainerComponent, HeaderComponent, PassagemComponent, FooterComponent, FiltrosComplementaresComponent, PassagemDestaqueComponent, CardComponent],
  templateUrl: './busca.component.html',
  styleUrl: './busca.component.scss'
})
export class BuscaComponent implements OnInit{
  protected srcBusca:string = 'imagens/banner-busca.png';
  protected altBusca:string = 'Banner Ponte sobre águas ligando dois pontos';
  #passagensService = inject(PassagensService);
  #formBuscaService = inject(FormBuscaService);
  passagem:Passagem[] = [];
  destaques?: Destaques;


  ngOnInit(): void {
    const buscaPadrao: DadosBusca = {
      pagina: 1,
      porPagina: 25,
      somenteIda: false,
      dataIda: new Date().toISOString(),
      passageirosAdultos: 1,
      tipo: "Executiva",
  }

  const busca = this.#formBuscaService.formBusca.valid ? this.#formBuscaService.obterDadosBusca() : buscaPadrao;
  this.#passagensService.getPassagens(busca)
  .pipe(take(1))
  .subscribe(
    res => {
     this.passagem = res.resultado
     this.#formBuscaService.formBusca.patchValue({
      precoMin: res.precoMin,
      precoMax: res.precoMax
     })
     this.obterDestaques()
    }
  )
}

buscarPassagem(value:DadosBusca){
  this.#passagensService.getPassagens(value).subscribe(
    res => {
     this.passagem = res.resultado
    }
  )
}

 obterDestaques(){
    this.destaques = this.#passagensService.obterPassagensDestaques(this.passagem);
  }

  limparFiltros() {
    this.#formBuscaService.resetarFiltros();
    this.ngOnInit();
  }

}
