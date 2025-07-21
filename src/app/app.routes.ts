import { Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { InvitacionComponent } from './invitacion/invitacion.component';
import { FinalComponent } from './final/final.component';

export const routes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'formulario', component: InvitacionComponent },
  {
  path: 'final/:id',
  loadComponent: () =>
    import('./final/final.component').then((m) => m.FinalComponent),
  data: { prerender: false }
}

];


