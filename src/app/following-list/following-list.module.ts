import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FollowingListPageRoutingModule } from './following-list-routing.module';

import { FollowingListPage } from './following-list.page';
import { SharedModule } from '../shared/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FollowingListPageRoutingModule,
    SharedModule
  ],
  declarations: [FollowingListPage]
})
export class FollowingListPageModule {}
