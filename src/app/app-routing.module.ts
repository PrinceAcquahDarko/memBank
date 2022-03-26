import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { CanActivateGuard } from './can-activate.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'folder/home',
    pathMatch: 'full'
  },
  {
    path: 'folder/home',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'folder/detail',
    loadChildren: () => import('./detail/detail.module').then( m => m.DetailPageModule)
  },
  {
    path: 'folder/profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'folder/settings',
    loadChildren: () => import('./settings/settings.module').then( m => m.SettingsPageModule)
  },
  {
    path: 'folder/gallary',
    loadChildren: () => import('./gallary/gallary.module').then( m => m.GallaryPageModule)
  },
  {
    path: 'folder/favourites',
    loadChildren: () => import('./favourites/favourites.module').then( m => m.FavouritesPageModule)
  },
  {
    path: 'folder/login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'folder/register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'folder/upload', canActivate:[CanActivateGuard],
    loadChildren: () => import('./upload/upload.module').then( m => m.UploadPageModule)
  },
  {
    path: 'folder/followers',
    loadChildren: () => import('./followers/followers.module').then( m => m.FollowersPageModule)
  },
  {
    path: 'follwers-list',
    loadChildren: () => import('./follwers-list/follwers-list.module').then( m => m.FollwersListPageModule)
  },
  {
    path: 'folder/confirm-pass',
    loadChildren: () => import('./confirm-pass/confirm-pass.module').then( m => m.ConfirmPassPageModule)
  },
  {
    path: 'following-list',
    loadChildren: () => import('./following-list/following-list.module').then( m => m.FollowingListPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
