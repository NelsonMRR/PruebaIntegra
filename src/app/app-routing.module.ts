import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AcercadeComponent } from './acercade/acercade.component';
import { InicioComponent } from './inicio/inicio.component';

const routes: Routes = [
  //Rutas para la redirección de paginas.
  { path: '', redirectTo: 'inicio', pathMatch: 'full'},
  { path: 'inicio', component: InicioComponent },
  { path: 'acercade', component: AcercadeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
