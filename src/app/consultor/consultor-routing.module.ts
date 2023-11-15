import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConsultorPage } from './consultor.page';

const routes: Routes = [
  {
    path: '',
    component: ConsultorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConsultorPageRoutingModule {}
