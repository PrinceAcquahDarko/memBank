import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  show = false;
  errormsg = ''
  @ViewChild(NgForm) loginForm: NgForm | undefined

  get isValid(): boolean{
    return this.loginForm?.valid ? true : false
  }
  userCredentials = {
    email: '',
    password: '',
  };
  constructor(private _as: AuthService, private _router:Router) { }

  ngOnInit() {
  }

  loginUser(){
    if(this.isValid){
      this.show = true;
      this._as.loginUser(this.userCredentials).subscribe(
        (res) => {
          console.log(res)
        },
        (err) => {
          this.errormsg = err.message;
          this.show = false;
        },
        () => {
          this.show = false;
        }
      );
    }else{
      this.errormsg = 'invalid credentials'
    }
   
  }

}
