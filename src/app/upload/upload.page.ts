import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MediaService } from '../media/media.service';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-upload',
  templateUrl: './upload.page.html',
  styleUrls: ['./upload.page.scss'],
})
export class UploadPage implements OnInit {
  @ViewChild(NgForm) uploadForm: NgForm | undefined
  btnText = 'Upload'
  openModal = false
  foundMedia = []
  show = false
  showLabel = true
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
    file: '',
    id:''
  };
  constructor(private _ms:MediaService, private _router:Router, public toastController: ToastController) { }

  ngOnInit() {
  }

  ionViewWillEnter(){

    let info = history.state.media
    if(info){
      this.showLabel  = false;
      this.btnText = 'Update'
      this.mediaCredentials.title = info.title
      this.mediaCredentials.description = info.description
      this.mediaCredentials.id = info.id
    }
  

  }

  continue(){
    this.show = true
    this.cancel()

    const formdata = new FormData()
    formdata.append('title', this.mediaCredentials.title)
    formdata.append('file', this.mediaCredentials.file)
    formdata.append('description', this.mediaCredentials.description)

    this._ms.continueUploadMedia(formdata).subscribe(
      res => {
        this.show = false
      
        let info = {media:res, me:true}
        this._router.navigateByUrl('/folder/home', {state: info})
      },
      err => {this.errormsg = err.message; this.show = false}
    )

  }



  cancel(){
    this.openModal = false
  }

  upload(){
    if(this.showLabel){
      // we are entering a new record
      if(this.isValid && this.mediaCredentials.file){
        this.show = true
        const formdata = new FormData()
        formdata.append('title', this.mediaCredentials.title)
        formdata.append('file', this.mediaCredentials.file)
        formdata.append('description', this.mediaCredentials.description)
    
        this._ms.uploadMedia(formdata, this.mediaCredentials.description).subscribe(
          res => {
            this.show = false
            if(res.foundMedia){
              this.openModal = true
              return this.foundMedia = res.media
            }
            let info = {media:res, update:false}
            this._router.navigateByUrl('/folder/home', {state: info})
  
          },
          err => {this.errormsg = err.message; this.show = false}
        )
      }else{
        this.errormsg = 'invalid credentials'
      }
    }else{
      //we are updating
      this._ms.updateMedia(this.mediaCredentials.id, this.mediaCredentials).subscribe(
        res => {
          let info = {media:this.mediaCredentials, update:true}
          this._router.navigateByUrl('/folder/home', {state: info})
        }
      )
    }

    
  
  }


}
