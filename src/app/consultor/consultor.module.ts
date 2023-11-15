import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConsultorPageRoutingModule } from './consultor-routing.module';

import { ConsultorPage } from './consultor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConsultorPageRoutingModule
  ],
  declarations: [ConsultorPage]
})
export class ConsultorPageModule {}
