import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreadorDeRecetasPage } from './creador-de-recetas.page';

const routes: Routes = [
  {
    path: '',
    component: CreadorDeRecetasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreadorDeRecetasPageRoutingModule {}
