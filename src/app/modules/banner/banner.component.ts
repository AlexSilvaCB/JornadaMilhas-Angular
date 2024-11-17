import { Component, input, Input } from '@angular/core';

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.scss'
})
export class BannerComponent {

  @Input() alt: string = '';
  //versão 18
  srcSignal = input.required<string>()

}
