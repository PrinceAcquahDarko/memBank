import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { AuthService } from '../auth/auth.service';
import { MediaService } from '../media/media.service';



function passwordMatcher(c: AbstractControl): { [key:string]: boolean } | null {

  const passwordControl = c.get('password');
  const confirmPassword = c.get('confirmPassword');

  if (passwordControl?.pristine || confirmPassword?.pristine){
    return null;
  }
  if (passwordControl?.value === confirmPassword?.value){
    return null
  }
  return {'match': true}
}


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
    firstName: '',
    lastName: '',
    email: '',
    pic: '',
    password: ''


  }

  updateForm: FormGroup = this.fb.group({

    passwordGroup: this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],

      confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
    }, {validators: passwordMatcher}),

  })
  user = false
  passerrormsg = 'update password'
  constructor(private fb: FormBuilder,private _router:Router, private _storage:Storage, private _as:AuthService, private _ms:MediaService) { }

  ngOnInit() {
    this._ms.getUser().subscribe(
      res => {this.credentials = res; this.user = true}
    )
  }

  updatePassword(){
    if(this.user){
      if(this.updateForm?.valid){
        this._router.navigateByUrl('/folder/confirm-pass', {state:this.updateForm.value.passwordGroup.password})
  
      }
    }
   
  }

  submit(){
    if(this.user){
    if(this.credentials.pic){
      const formdata = new FormData()
        formdata.append('firstName', this.credentials.firstName)
        formdata.append('lastName', this.credentials.firstName)
        formdata.append('enail', this.credentials.email)
        formdata.append('file', this.credentials.pic)

        //call the service
        this._as.updateUser(formdata).subscribe(
          res => {}
        )
    }else{
      this._as.updateUser(this.credentials).subscribe(
        res => {}
      )
    }

    //
  }
    
  }


  logout(){
    this._storage.clear();
    this._as.cache['userId'] = ''
    location.reload()

  }

}
