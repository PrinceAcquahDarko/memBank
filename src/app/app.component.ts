import { Component } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import * as CordovaSQLiteDriver from 'localforage-cordovasqlitedriver';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
   login = 'Login'
  public appPages = [
    { title: 'Home', url: '/folder/home', icon: 'home' },
    { title: 'Gallary', url: '/folder/gallary', icon: 'paper-plane' },
    { title: 'Favorites', url: 'folder/favourites', icon: 'heart' },
    { title: 'Settings', url: '/folder/settings', icon: 'archive' },
    { title: 'Following', url: '/folder/followers', icon: 'archive' },
    { title: this.login, url: '/folder/login', icon: 'trash' },
  ];
  constructor(private storage:Storage) {this.init()}


  async init() {
    await this.storage.defineDriver(CordovaSQLiteDriver);
    await this.storage.create();
    }
    
}
