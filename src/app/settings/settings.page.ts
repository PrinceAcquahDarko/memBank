import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  label = 'Upload an img'

  selectImage(event: any){
    if(event.target.files.length > 0){
      const file = event.target.files[0];
      this.label = file.name
      this.credentials.pic = file
    }
  }
  credentials = {
    firstname: '',
    lastname: '',
    email: '',
    pic: '',
    password: ''


  }
  constructor() { }

  ngOnInit() {
  }

  submit(){
    
  }

}
