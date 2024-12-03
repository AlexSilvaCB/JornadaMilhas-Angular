import { Component, inject, Input, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormBuscaService } from '../../../core/services/form-busca.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { UnidadeFederativaService } from '../../../core/services/unidade-federativa.service';
import { UnidadeFederativa } from '../../../core/types/types';

@Component({
  selector: 'app-dropdown-uf',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    AsyncPipe,
  ],
  templateUrl: './dropdown-uf.component.html',
  styleUrl: './dropdown-uf.component.scss',
})
export class DropdownUfComponent implements OnInit {
  formBuscaService = inject(FormBuscaService);
  unidFederativaService = inject(UnidadeFederativaService);

  @Input() label: string = '';
  @Input() iconePrefix: string = '';
  @Input() control!: FormControl;

  protected options: UnidadeFederativa[] = [];
  protected filteredOptions!: Observable<UnidadeFederativa[]>;

  ngOnInit() {
    this.unidFederativaService.listar().subscribe({
      next: (dados) => {
        this.options = dados.sort((a, b) => {
          if (a.nome < b.nome) {
            return -1;
          } else {
            return 1;
          }
        });
        this.formBuscaService.inputListValidator = dados;
      },
    });
  }

  private _filter(value: string): UnidadeFederativa[] {
    const filterValue = value.toLowerCase();

    return this.options.filter((option) =>
      option.nome.toLocaleLowerCase().includes(filterValue)
    );
  }

  focusI() {
    this.filteredOptions = this.control.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || ''))
    );
  }
}
