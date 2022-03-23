import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import * as CordovaSQLiteDriver from 'localforage-cordovasqlitedriver';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Home', url: '/folder/home', icon: 'home' },
    { title: 'Favorites', url: 'folder/favourites', icon: 'heart' },
    { title: 'Gallary', url: '/folder/gallary', icon: 'image' },
    { title: 'Following', url: '/folder/followers', icon: 'person-add' },
    { title: 'Settings', url: '/folder/settings', icon: 'settings' },
    // { title: this.status, url: '/folder/login', icon: 'logout' },
  ];
  constructor(private storage:Storage, private _as:AuthService) {this.init()}


  async init() {
    await this.storage.defineDriver(CordovaSQLiteDriver);
    await this.storage.create();
    }

 
    
}
