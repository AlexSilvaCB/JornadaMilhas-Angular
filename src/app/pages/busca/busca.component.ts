import { Component } from '@angular/core';
import { FormBuscaComponent } from '../../modules/form-busca/form-busca.component';
import { ContainerComponent } from '../../modules/container/container.component';
import { BannerComponent } from '../../modules/banner/banner.component';
import { HeaderComponent } from "../../modules/header/header.component";
import { FooterComponent } from "../../modules/footer/footer.component";

@Component({
  selector: 'app-busca',
  standalone: true,
  imports: [FormBuscaComponent, ContainerComponent, BannerComponent, HeaderComponent, FooterComponent],
  templateUrl: './busca.component.html',
  styleUrl: './busca.component.scss'
})
export class BuscaComponent {
  protected srcBusca:string = 'imagens/banner-busca.png';
  protected altBusca:string = 'Banner Ponte sobre águas ligando dois pontos';
}
