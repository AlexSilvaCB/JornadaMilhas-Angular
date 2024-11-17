import { Component } from '@angular/core';
import { HeaderComponent } from '../../modules/header/header.component';
import { BannerComponent } from '../../modules/banner/banner.component';

@Component({
  selector: 'app-principal-jornada',
  standalone: true,
  imports: [HeaderComponent, BannerComponent],
  templateUrl: './principal-jornada.component.html',
  styleUrl: './principal-jornada.component.scss'
})
export class PrincipalJornadaComponent {
  srcHome: string = "imagens/banner-homepage.png"
  altHome: string = "Banner Jornada Milha"
}
