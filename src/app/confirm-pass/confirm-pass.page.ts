import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-confirm-pass',
  templateUrl: './confirm-pass.page.html',
  styleUrls: ['./confirm-pass.page.scss'],
})
export class ConfirmPassPage implements OnInit {
  newPass =   this._router.getCurrentNavigation().extras.state;

  enterPass = 'Enter password to continue'
  userCredentials = {
    password: '',
    newPass: this.newPass
  }
  errormsg = ''
  constructor(private _as:AuthService, private _router:Router) { }

  ngOnInit() {
  }

  submitPass(){
      

      if(this.userCredentials.password){
      
        this._as.updatepass(this.userCredentials).subscribe(
          res => this.enterPass = 'updated successfully',
            err => {this.errormsg = err.message; }
        )
      }

  }

}
