import { Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatChipsModule } from '@angular/material/chips';
import { BotaoControleComponent } from './botao-controle/botao-controle.component';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle, MatButtonModule, MatChipsModule, BotaoControleComponent],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {

  contAdulto: number = 0
  contCrianca: number = 0
  contBebe: number = 0

  contViajante(contPessoa: string, contSinal: string){
    if(contPessoa === 'Adulto'){
      let cont01:number = 0
      cont01 = contSinal === '+' ? this.contAdulto + 1 : this.contAdulto - 1
      this.contAdulto = cont01 < 0 ? 0 : cont01
    } else if(contPessoa === 'Crianca'){
      let cont02: number = 0
      cont02 = contSinal === '+' ? this.contCrianca + 1 : this.contCrianca - 1
      this.contCrianca = cont02 < 0 ? 0 : cont02
    } else{
      let cont03:number = 0
      cont03 =  contSinal === '+' ? this.contBebe + 1 : this.contBebe - 1
      this.contBebe = cont03 < 0 ? 0 : cont03
    }
  }
}
