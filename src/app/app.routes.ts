import { Routes } from '@angular/router';
import { PrincipalJornadaComponent } from './pages/principal-jornada/principal-jornada.component';
import { LoginComponent } from './pages/login/login.component';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { authGuard } from './core/guards/aut.guard';
import { BuscaComponent } from './pages/busca/busca.component';

export const routes: Routes = [
  {
    path: '',
    component: PrincipalJornadaComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'cadastro',
    component: CadastroComponent,
  },
  {
    path: 'perfil',
    component: PerfilComponent,
    canActivate: [authGuard],
  },
  {
    path:'busca',
    component: BuscaComponent,
    }
];
