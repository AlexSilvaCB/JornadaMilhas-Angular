import { Component } from '@angular/core';
import { HeaderComponent } from "../../modules/header/header.component";
import { FooterComponent } from "../../modules/footer/footer.component";
import { BannerComponent } from "../../modules/banner/banner.component";
import { FormBaseComponent } from "../../modules/form-base/form-base.component";

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, BannerComponent, FormBaseComponent],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.scss'
})
export class CadastroComponent {

  protected srcCadastro: string = 'imagens/banner-cadastro.png'
  protected altCadastro: string = 'Banner da tela cadastro'
  protected perfilCadastro: boolean = false


}
