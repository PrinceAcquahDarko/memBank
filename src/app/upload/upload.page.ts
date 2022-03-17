import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MediaService } from '../media/media.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.page.html',
  styleUrls: ['./upload.page.scss'],
})
export class UploadPage implements OnInit {
  @ViewChild(NgForm) uploadForm: NgForm | undefined

  get isValid(): boolean{
    return this.uploadForm?.valid ? true : false
  }
  label = 'Upload media'
  errormsg = ''
  selectImage(event: any){
    if(event.target.files.length > 0){
      const file = event.target.files[0];
      this.label = file.name
      this.mediaCredentials.file = file
    }
  }
  mediaCredentials = {
    title: '',
    description: '',
    file: ''
  };
  constructor(private _ms:MediaService) { }

  ngOnInit() {
  }

  upload(){
    

    if(this.isValid && this.mediaCredentials.file){
      const formdata = new FormData()
      formdata.append('title', this.mediaCredentials.title)
      formdata.append('file', this.mediaCredentials.file)
      formdata.append('description', this.mediaCredentials.description)
  
      console.log(formdata)
      this._ms.uploadMedia(formdata).subscribe(
        res => {
          console.log(res)
        },
        err => this.errormsg = err.message
      )
    }else{
      this.errormsg = 'invalid credentials'
    }
  
  }


}
