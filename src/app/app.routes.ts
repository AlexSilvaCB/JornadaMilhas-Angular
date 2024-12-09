import { Routes } from '@angular/router';
import { PrincipalJornadaComponent } from './pages/principal-jornada/principal-jornada.component';
import { LoginComponent } from './pages/login/login.component';
import { CadastroComponent } from './pages/cadastro/cadastro.component';

export const routes: Routes = [
  {
    path:'',
    component: PrincipalJornadaComponent
  },
  {
    path:'login',
    component: LoginComponent,
  },
  {
    path: 'cadastro',
    component: CadastroComponent
  }
];
