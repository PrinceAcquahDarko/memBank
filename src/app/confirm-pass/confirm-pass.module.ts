import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConfirmPassPageRoutingModule } from './confirm-pass-routing.module';

import { ConfirmPassPage } from './confirm-pass.page';
import { SharedModule } from '../shared/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConfirmPassPageRoutingModule,
    SharedModule
  ],
  declarations: [ConfirmPassPage]
})
export class ConfirmPassPageModule {}
