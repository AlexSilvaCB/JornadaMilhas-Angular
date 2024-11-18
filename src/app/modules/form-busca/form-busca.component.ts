import { Component } from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { ContainerComponent } from '../container/container.component';
import { CardComponent } from '../card/card.component';


@Component({
  selector: 'app-form-busca',
  standalone: true,
  imports: [ContainerComponent, CardComponent, MatButtonToggleModule, MatChipsModule, MatFormFieldModule, MatIconModule, MatInputModule, MatDatepickerModule,  MatNativeDateModule, MatButtonModule],
  templateUrl: './form-busca.component.html',
  styleUrl: './form-busca.component.scss'
})
export class FormBuscaComponent {



}
