import { Component, inject, Input, OnInit } from '@angular/core';
import { FormBuscaComponent } from '../../modules/form-busca/form-busca.component';
import { ContainerComponent } from '../../modules/container/container.component';
import { BannerComponent } from '../../modules/banner/banner.component';
import { HeaderComponent } from "../../modules/header/header.component";
import { FooterComponent } from "../../modules/footer/footer.component";
import { PassagensService } from '../../core/services/passagens.service';
import { DadosBusca, Passagem } from '../../core/types/types';
import { FormBuscaService } from '../../core/services/form-busca.service';
import { PassagemComponent } from '../../modules/passagem/passagem.component';

@Component({
  selector: 'app-busca',
  standalone: true,
  imports: [FormBuscaComponent, ContainerComponent, BannerComponent, HeaderComponent, PassagemComponent, FooterComponent],
  templateUrl: './busca.component.html',
  styleUrl: './busca.component.scss'
})
export class BuscaComponent implements OnInit{
  protected srcBusca:string = 'imagens/banner-busca.png';
  protected altBusca:string = 'Banner Ponte sobre águas ligando dois pontos';
  #passagensService = inject(PassagensService);
  #formBuscaService = inject(FormBuscaService);
  passagem!:Passagem[];


  ngOnInit(): void {
    const buscaPadrao = {
      pagina: 1,
      porPagina: 25,
      somenteIda: false,
      dataIda: new Date().toISOString(),
      passageirosAdultos: 1,
      tipo: "Executiva",
  }

  const busca = this.#formBuscaService.formBusca.valid ? this.#formBuscaService.obterDadosBusca : buscaPadrao;
  console.log(this.#formBuscaService.formBusca.valid)

  this.#passagensService.getPassagens(busca).subscribe(
    res => {
     this.passagem = res.resultado
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

}
