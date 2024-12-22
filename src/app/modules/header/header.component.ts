import { Component, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { AsyncPipe } from '@angular/common';
import { ContainerComponent } from '../container/container.component';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../core/services/user.service';
import { PessoaUsuaria } from '../../core/types/types';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    ContainerComponent,
    RouterLink,
    AsyncPipe,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  #userService = inject(UserService);
  #router = inject(Router);

  protected user$ = this.#userService.retornarUser();

  logout() {
    this.#userService.logout();
    this.#router.navigate(['/login']);
  }
}
