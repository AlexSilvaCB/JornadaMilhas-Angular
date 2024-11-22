import { Component, inject, OnInit } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { DepoimentoService } from '../../core/services/depoimento.service';
import { Depoimentos } from '../../core/types/types';

@Component({
  selector: 'app-card-depoimento',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './card-depoimento.component.html',
  styleUrl: './card-depoimento.component.scss'
})
export class CardDepoimentoComponent implements OnInit {

 protected depoimentoService = inject(DepoimentoService)

 protected cardDepoimento: Depoimentos[] = []

 ngOnInit(): void {
  this.listarDepoimentos()
}

protected listarDepoimentos(){
  this.depoimentoService.listarDepoimento$().subscribe({
    next:(res)=>{
      this.cardDepoimento = res
      console.log(res)},
    error:(error) =>
      alert("Falha ao conectar dados")
  })
}
}
