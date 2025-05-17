import { Component, inject, OnInit } from '@angular/core';
import { LabelComponent } from '../../label/label.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { OpcoesDeParada } from '../../../core/types/types';
import { FormControl } from '@angular/forms';
import { FormBuscaService } from '../../../core/services/form-busca.service';
import { obterControle } from '../../../core/types/functions';
@Component({
  selector: 'app-paradas',
  standalone: true,
  imports: [LabelComponent, MatCheckboxModule],
  templateUrl: './paradas.component.html',
  styleUrl: './paradas.component.scss'
})
export class ParadasComponent implements OnInit{
  formBuscaService = inject(FormBuscaService)
  opcoesSelecionada: OpcoesDeParada | null = null;
  opcoes: OpcoesDeParada[] = [
      {
        display: "Direto",
        value: "0"
      },
      {
        display: "1 conexão",
        value: "1"
      },
      {
        display: "2 conexões",
        value: "2"
      },
      {
        display: "Mais de 2 conexões",
        value: "3"
      },
    ]

    conexoesControl!: FormControl<number | null>

    ngOnInit(): void {
      this.conexoesControl = obterControle<number>('conexoes', this.formBuscaService.formBusca)

      this.conexoesControl.valueChanges.subscribe(
        (value) => {
            if(!value){ this.opcoesSelecionada = null}
      })
    }

    alternarParada(opcao: OpcoesDeParada, checked: boolean){
      if(!checked){
        this.opcoesSelecionada = null;
        this.formBuscaService.formBusca.patchValue({
          conexoes: null
        })
        return
      }
      this.opcoesSelecionada = opcao
      this.formBuscaService.formBusca.patchValue({
        conexoes: Number(opcao.value)
      })
    }

    paradaSelecionada(opcao: OpcoesDeParada): boolean{
    return this.opcoesSelecionada === opcao
  }

    incluirParada(opcao: OpcoesDeParada){
      if(!this.opcoesSelecionada){
        return false
      }
      return this.opcoesSelecionada.value > opcao.value
  }

}
