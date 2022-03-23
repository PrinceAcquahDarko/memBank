import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, } from 'rxjs';
import {AuthService} from './auth/auth.service'
@Injectable({
  providedIn: 'root'
})
export class CanActivateGuard implements CanActivate {
  constructor(private _router:Router, private _as:AuthService){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkLoggedIn();
  }

  async checkLoggedIn(){
    const obs = this._as.getLoggedInUser()
    try{
    const final = await obs.toPromise()
    if(final){
      return true
    }
    }catch(err){
      this._router.navigateByUrl('/folder/login')
      return false
    }
    

   
  }
  
}
