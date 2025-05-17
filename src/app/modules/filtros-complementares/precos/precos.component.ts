import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LabelComponent } from '../../label/label.component';
import { MatSliderModule } from '@angular/material/slider';


@Component({
  selector: 'app-precos',
  standalone: true,
  imports: [LabelComponent, CommonModule, MatSliderModule],
  templateUrl: './precos.component.html',
  styleUrl: './precos.component.scss'
})
export class PrecosComponent {
  precoMin?: number = 0;
  precoMax?: number = 5000
}
