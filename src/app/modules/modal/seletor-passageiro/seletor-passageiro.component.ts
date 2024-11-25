import { Component, inject, Input } from '@angular/core';
import { BotaoControleComponent } from '../botao-controle/botao-controle.component';
import { FormBuscaService } from '../../../core/services/form-busca.service';

@Component({
  selector: 'app-seletor-passageiro',
  standalone: true,
  imports: [BotaoControleComponent],
  templateUrl: './seletor-passageiro.component.html',
  styleUrl: './seletor-passageiro.component.scss',
})
export class SeletorPassageiroComponent {
  protected formBuscaService = inject(FormBuscaService);
  @Input() titulo: string = '';
  @Input() subtitulo: string = '';

  protected value: number = 0;

  incrementar(pessoa: string) {
    this.value += 1;
    if (pessoa === 'Adulto') {
      this.formBuscaService.formBusca.patchValue({ adultos: this.value });
    } else if (pessoa === 'Crianças') {
      this.formBuscaService.formBusca.patchValue({ criancas: this.value });
    } else {
      this.formBuscaService.formBusca.patchValue({ bebes: this.value });
    }
  }

  decrementar(pessoa: string) {
    if (this.value > 0) {
      this.value -= 1;
      if (pessoa === 'Adulto') {
        this.formBuscaService.formBusca.patchValue({ adultos: this.value });
      } else if (pessoa === 'Crianças') {
        this.formBuscaService.formBusca.patchValue({ criancas: this.value });
      } else {
        this.formBuscaService.formBusca.patchValue({ bebes: this.value });
      }
    }
  }
}
