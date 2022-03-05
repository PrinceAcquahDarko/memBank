import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.page.html',
  styleUrls: ['./upload.page.scss'],
})
export class UploadPage implements OnInit {
  label = 'Upload media'

  selectImage(event: any){
    if(event.target.files.length > 0){
      const file = event.target.files[0];
      this.label = file.name
      // this.credentials.pic = file
    }
  }
  userCredentials = {
    title: '',
    description: '',
  };
  constructor() { }

  ngOnInit() {
  }

  upload(){}
}
