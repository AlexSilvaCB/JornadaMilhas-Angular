import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HeaderComponent } from '../../modules/header/header.component';
import { BannerComponent } from '../../modules/banner/banner.component';
import { FooterComponent } from '../../modules/footer/footer.component';
import { ReactiveFormsModule,FormsModule, NonNullableFormBuilder, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarModule, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { JsonPipe } from '@angular/common';
import { LoginService } from '../../core/services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    MatIconModule,
    HeaderComponent,
    BannerComponent,
    FooterComponent,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  protected srcLogin: string = 'imagens/banner-login.png';
  protected altLogin: string = 'Banner da tela de login';

  #loginService = inject(LoginService)
  #router!:Router
  #fbLogin = inject(NonNullableFormBuilder);

  private _snackBar = inject(MatSnackBar);

  #horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  #verticalPosition: MatSnackBarVerticalPosition = 'top';
  #durationInSeconds = 5;

  formLogin = this.#fbLogin.group({
    email: ['', [Validators.required, Validators.pattern('^[a-z0-9.+-]+@[a-z0-9.-]+\\.[a-z]{2,}$')]],
    senha: ['', [Validators.required, Validators.maxLength(3), Validators.minLength(3)]],
  });

  login() {
    console.log(this.formLogin.getRawValue())
    this.#loginService.autenticar$(this.formLogin.getRawValue()).subscribe({
      next:(value) =>{
        console.log(value)
        this.#router.navigateByUrl('/')
      },
      error:(err) =>{
        this.openSnackBar()
      }
    })
  }

  openSnackBar() {
    this._snackBar.open('Email ou senha inválido!!', 'Fechar', {
      horizontalPosition: this.#horizontalPosition,
      verticalPosition: this.#verticalPosition,
      duration: this.#durationInSeconds * 1000,
    });
  }

}
