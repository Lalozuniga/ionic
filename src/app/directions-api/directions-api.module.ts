import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DirectionsApiPageRoutingModule } from './directions-api-routing.module';

import { DirectionsApiPage } from './directions-api.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DirectionsApiPageRoutingModule
  ],
  declarations: [DirectionsApiPage]
})
export class DirectionsApiPageModule {}
