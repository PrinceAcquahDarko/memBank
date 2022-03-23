import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FollwersListPage } from './follwers-list.page';

const routes: Routes = [
  {
    path: '',
    component: FollwersListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FollwersListPageRoutingModule {}
