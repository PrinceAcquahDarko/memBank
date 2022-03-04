import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GallaryPageRoutingModule } from './gallary-routing.module';

import { GallaryPage } from './gallary.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GallaryPageRoutingModule
  ],
  declarations: [GallaryPage]
})
export class GallaryPageModule {}
