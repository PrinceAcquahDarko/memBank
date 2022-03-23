import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UploadPageRoutingModule } from './upload-routing.module';

import { UploadPage } from './upload.page';
import { SharedModule } from '../shared/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UploadPageRoutingModule,
    SharedModule
  ],
  declarations: [UploadPage]
})
export class UploadPageModule {}
