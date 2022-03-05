import { Component } from '@angular/core';
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
    { title: this.login, url: '/folder/login', icon: 'trash' },
    { title: 'Spam', url: '/folder/Spam', icon: 'warning' },
  ];
  constructor() {}
}
