import { Component, inject, Input, OnInit, signal } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { Promocao } from '../../core/types/types';
import { PromocaoService } from '../../core/services/promocao.service';

@Component({
  selector: 'app-card-busca',
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './card-busca.component.html',
  styleUrl: './card-busca.component.scss'
})
export class CardBuscaComponent implements OnInit {
  #apiJornada = inject(PromocaoService)
  protected _listaPromocoes = signal<Promocao[]>([])

  constructor(){}

  ngOnInit(): void {
    this.listaJornadaPromoções()
  }

  protected listaJornadaPromoções(){
    this.#apiJornada.listar$().subscribe({
      next:(result) => {
        this._listaPromocoes.set(result)
      }
    })
  }

}
