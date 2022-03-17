import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { Storage } from '@ionic/storage-angular';


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
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  errormsg = ''
  show = false
  registerForm: FormGroup = this.fb.group({

    firstname: ['', [Validators.required]],
    lastname: ['', [Validators.required]],

    email: ['', [Validators.required, Validators.email]],

    passwordGroup: this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],

      confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
    }, {validators: passwordMatcher}),

  })
  constructor(private fb: FormBuilder,private _router:Router, private _as: AuthService, private _storage:Storage) { }

  ngOnInit() {
  }

  registerUser(){
    this.show = true
    if(this.registerForm?.valid){
      let data = this.formatValue()
      this._as.registerUser(data).subscribe(
        res => {
          console.log(res)
          this._storage.set('token', res.accesstoken)
        },
        err => {
          this.show = false
          this.errormsg = err;

        },
      )
    }
  }

  formatValue(){
    return {
      firstName : this.registerForm.value.firstname,
      lastName : this.registerForm.value.lastname,
      email : this.registerForm.value.email,
      password : this.registerForm.value.passwordGroup.password
    }

  }

}
