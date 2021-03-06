import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StringTransformPipe } from '../stringTransform.pipe';

import { IonicModule } from '@ionic/angular';

import { FolderPageRoutingModule } from './folder-routing.module';


import { FolderPage } from './folder.page';
import { SharedModule } from '../shared/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
  
    IonicModule,
    FolderPageRoutingModule,
    SharedModule
  ],
  declarations: [FolderPage, StringTransformPipe]
})
export class FolderPageModule {}
