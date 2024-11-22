import { Component, inject, OnInit, signal } from '@angular/core';
import { HeaderComponent } from '../../modules/header/header.component';
import { BannerComponent } from '../../modules/banner/banner.component';
import { ContainerComponent } from '../../modules/container/container.component';
import { FooterComponent } from '../../modules/footer/footer.component';
import { CardBuscaComponent } from '../../modules/card-busca/card-busca.component';
import { CardDepoimentoComponent } from '../../modules/card-depoimento/card-depoimento.component';
import { FormBuscaComponent } from '../../modules/form-busca/form-busca.component';
import { PromocaoService } from '../../core/services/promocao.service';
import { Promocao } from '../../core/types/types';

@Component({
  selector: 'app-principal-jornada',
  standalone: true,
  imports: [HeaderComponent, BannerComponent, ContainerComponent, FooterComponent, CardBuscaComponent, CardDepoimentoComponent, FormBuscaComponent],
  templateUrl: './principal-jornada.component.html',
  styleUrl: './principal-jornada.component.scss'
})
export class PrincipalJornadaComponent implements OnInit {
  #apiJornada = inject(PromocaoService)

  protected srcHome: string = "imagens/banner-homepage.png"
  protected altHome: string = "Banner Jornada Milha"
  protected _listaPromocoes = signal<Promocao[]>([])

  constructor(){}

  ngOnInit(): void {
    this.listaJornadaPromoções()
  }

  listaJornadaPromoções(){
    this.#apiJornada.listar$().subscribe({
      next:(result) => {
        this._listaPromocoes.set(result)
      }
    })
  }


}
