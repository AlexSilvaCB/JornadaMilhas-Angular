import { Component, inject, OnInit } from '@angular/core';
import { HeaderComponent } from '../../modules/header/header.component';
import { FooterComponent } from '../../modules/footer/footer.component';
import { BannerComponent } from '../../modules/banner/banner.component';
import { FormBaseComponent } from '../../modules/form-base/form-base.component';
import { UserService } from '../../core/services/user.service';
import { PessoaUsuaria } from '../../core/types/types';
import { TokenService } from '../../core/services/token.service';
import { CadastroService } from '../../core/services/cadastro.service';
import { Router } from '@angular/router';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { FormGroup } from '@angular/forms';
import { UnidadeFederativaService } from '../../core/services/unidade-federativa.service';
import { FormBaseService } from '../../core/services/form-base';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    BannerComponent,
    FormBaseComponent,
  ],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.scss',
})
export class PerfilComponent implements OnInit {
  protected srcPerfil: string = 'imagens/banner-perfil.png';
  protected altPerfil: string = 'Banner da tela de Perfil';
  protected tituloPerfil: string = 'Olá ';
  protected textoBotaoPerfil: string = 'ATUALIZAR';
  protected token: string = '';
  protected nome: string = '';
  protected cadastro!: PessoaUsuaria;
  protected form!: FormGroup<any> | null;
  #tokenService = inject(TokenService);
  #cadastroService = inject(CadastroService);
  #userService = inject(UserService);
  #formBaseService = inject(FormBaseService);
  #router = inject(Router);
  estados$ = inject(UnidadeFederativaService);
  private _snackBar = inject(MatSnackBar);
  #horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  #verticalPosition: MatSnackBarVerticalPosition = 'top';
  #durationInSeconds = 3;

  ngOnInit(): void {
    this.token = this.#tokenService.retornarToken();
    this.#formBaseService.formBase;
    this.#cadastroService.buscarCadastro().subscribe({
      next: (cadastro) => {
        this.cadastro = cadastro;
        this.nome = this.cadastro.nome;
        this.carregarFormulario();
      },
    });
  }

  carregarFormulario() {
    this.#formBaseService.formBase.patchValue({
      nome: this.cadastro.nome,
      nascimento: new Date(this.cadastro.nascimento),
      cpf: this.cadastro.cpf,
      telefone: this.cadastro.telefone,
      email: this.cadastro.email,
      senha: this.cadastro.senha,
      cidade: this.cadastro.cidade,
      estado: this.cadastro.estado,
      genero: this.cadastro.genero,
    });
  }

  atualizar() {
    const dadosAtualizados = {
      nome: this.form?.value.nome,
      nascimento: this.form?.value.nascimento,
      cpf: this.form?.value.cpf,
      telefone: this.form?.value.telefone,
      email: this.form?.value.email,
      senha: this.form?.value.senha,
      genero: this.form?.value.genero,
      cidade: this.form?.value.cidade,
      estado: this.form?.value.estado,
    };

    this.#cadastroService.editarCadastro(dadosAtualizados).subscribe({
      next: () => {
        this.openSnackBar(1);
        setTimeout(() => {
          this.#router.navigateByUrl('/');
        }, 3000);
      },
      error: (err) => {
        this.openSnackBar(2);
      },
    });
  }

  deslogar() {
    this.#userService.logout();
    this.#router.navigateByUrl('/login');
  }

  openSnackBar(returnForm: number) {
    if (returnForm === 1) {
      this._snackBar.open('Cadastro atualizado com sucesso!!', 'Ok', {
        duration: this.#durationInSeconds * 1000,
        panelClass: 'msgDefault',
        horizontalPosition: this.#horizontalPosition,
        verticalPosition: this.#verticalPosition,
      });
    }

    if (returnForm === 2) {
      this._snackBar.open('Não foi possivel atualizar o cadastro!!', 'Ok', {
        duration: this.#durationInSeconds * 1000,
        panelClass: 'msgDefault',
        horizontalPosition: this.#horizontalPosition,
        verticalPosition: this.#verticalPosition,
      });
    }
  }
}
