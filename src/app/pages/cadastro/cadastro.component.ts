import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../../modules/header/header.component';
import { FooterComponent } from '../../modules/footer/footer.component';
import { BannerComponent } from '../../modules/banner/banner.component';
import { FormBaseComponent } from '../../modules/form-base/form-base.component';
import { Router } from '@angular/router';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { PessoaUsuaria } from '../../core/types/types';
import { FormularioService } from '../../core/services/formulario.service';
import { CadastroService } from '../../core/services/cadastro.service';
import { mapFormData } from '../../core/types/functions';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    BannerComponent,
    FormBaseComponent,
  ],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.scss',
})
export class CadastroComponent {
  protected srcCadastro: string = 'imagens/banner-cadastro.png';
  protected altCadastro: string = 'Banner da tela cadastro';
  protected perfilCadastro: boolean = false;

  #formularioService = inject(FormularioService);
  #cadastroService = inject(CadastroService);
  #router = inject(Router);

  private _snackBar = inject(MatSnackBar);
  #horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  #verticalPosition: MatSnackBarVerticalPosition = 'top';
  #durationInSeconds = 3;

  sendCadastro() {
    const formatada: PessoaUsuaria = mapFormData(
      this.#formularioService.getCadastro()?.getRawValue()
    );
    this.#cadastroService.cadastrar(formatada).subscribe({
      next: (value) => {
        this.openSnackBar(1);
        setTimeout(() => {
          this.#router.navigateByUrl('/login');
        }, 3000);
      },
      error: (err) => {
        console.log(err);
        this.openSnackBar(2);
      },
    });
  }

  openSnackBar(returnForm: number) {
    if (returnForm === 1) {
      this._snackBar.open('Cadastro realizado com sucesso!!', 'Ok', {
        duration: this.#durationInSeconds * 1000,
        panelClass: 'msgDefault',
        horizontalPosition: this.#horizontalPosition,
        verticalPosition: this.#verticalPosition,
      });
    }

    if (returnForm === 2) {
      this._snackBar.open('Não foi possivel realizar o cadastro!!', 'Ok', {
        duration: this.#durationInSeconds * 1000,
        panelClass: 'msgDefault',
        horizontalPosition: this.#horizontalPosition,
        verticalPosition: this.#verticalPosition,
      });
    }
  }
}
