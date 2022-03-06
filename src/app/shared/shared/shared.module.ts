import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { BackHeaderComponent } from '../back-header/back-header.component';
import { VidComponent } from '../vid/vid.component';

import { VgCoreModule } from '@videogular/ngx-videogular/core';
import { VgControlsModule } from '@videogular/ngx-videogular/controls';
import { VgOverlayPlayModule } from '@videogular/ngx-videogular/overlay-play';
import { VgBufferingModule } from '@videogular/ngx-videogular/buffering';
import { BigVidComponent } from '../big-vid/big-vid.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [HeaderComponent, BackHeaderComponent,VidComponent, BigVidComponent],
  imports: [
    CommonModule,
    IonicModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule
  ],
  exports:[
    HeaderComponent,
    BackHeaderComponent,
    VidComponent,
    BigVidComponent
    
  ]
})
export class SharedModule { }
