import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'lista-usuarios',
    loadChildren: () => import('./lista-usuarios/lista-usuarios.module').then( m => m.ListaUsuariosPageModule)
  },
  {
    path: 'directions-api',
    loadChildren: () => import('./directions-api/directions-api.module').then( m => m.DirectionsApiPageModule)
  },
  {
    path: 'creador-de-recetas',
    loadChildren: () => import('./creador-de-recetas/creador-de-recetas.module').then( m => m.CreadorDeRecetasPageModule)
  },
  {
    path: 'consultor',
    loadChildren: () => import('./consultor/consultor.module').then( m => m.ConsultorPageModule)
  },
  {
    path: 'formulario',
    loadChildren: () => import('./formulario/formulario.module').then( m => m.FormularioPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
