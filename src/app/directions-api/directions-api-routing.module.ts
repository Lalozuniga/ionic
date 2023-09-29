import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DirectionsApiPage } from './directions-api.page';

const routes: Routes = [
  {
    path: '',
    component: DirectionsApiPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DirectionsApiPageRoutingModule {}
