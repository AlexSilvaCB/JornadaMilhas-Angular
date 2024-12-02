import {
  Component,
  computed,
  inject,
  Input,
  OnInit,
  signal,
} from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  DateAdapter,
  MAT_DATE_LOCALE,
  MatNativeDateModule,
} from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormBuscaService } from '../../../core/services/form-busca.service';

@Component({
  selector: 'app-form-date',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatInputModule,
    FormsModule,
  ],
  templateUrl: './form-date.component.html',
  styleUrl: './form-date.component.scss',
})
export class FormDateComponent implements OnInit {
  protected formBuscaService = inject(FormBuscaService);

  @Input() titulo: string = '';
  @Input() dadosTitulo: any;
  @Input() selecao: string = ''
  @Input() controlData!: FormControl

  private readonly _adapter =
    inject<DateAdapter<unknown, unknown>>(DateAdapter);
  private readonly _locale = signal(inject<unknown>(MAT_DATE_LOCALE));
  readonly dateFormatString = computed(() => {
    if (this._locale() === 'pt-BR') {
      return 'DD/MM/YYYY';
    }
    return '';
  });

  ngOnInit(): void {
    this.brazil();
  }

  brazil() {
    this._locale.set('pt-BR');
    this._adapter.setLocale(this._locale());
  }

  InputViagemData(value: string, tipo:string){
    if(tipo === 'dateIda'){
    this.formBuscaService.formBusca.patchValue({dateIda:value})
    }else{
      this.formBuscaService.formBusca.patchValue({dateVolta:value})
    }
  }

}
