import { NoEncontradoComponent } from './components/no-encontrado/no-encontrado.component';
import { EditarClienteComponent } from './components/editar-cliente/editar-cliente.component';
import { ConfiguracionComponent } from './components/configuracion/configuracion.component';
import { RegistroComponent } from './components/registro/registro.component';
import { LoginComponent } from './components/login/login.component';
import { TableroComponent } from './components/tablero/tablero.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guardianes/auth.guard';

const routes: Routes = [
  {path: '', component: TableroComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'registrarse', component: RegistroComponent},
  {path: 'configuracion', component: ConfiguracionComponent, canActivate: [AuthGuard]},
  {path: 'cliente/editar/:id', component: EditarClienteComponent, canActivate: [AuthGuard]},
  {path: '**', component: NoEncontradoComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
