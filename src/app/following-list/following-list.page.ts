import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import {AuthService} from '../auth/auth.service'
import { MediaService } from '../media/media.service';

@Component({
  selector: 'app-following-list',
  templateUrl: './following-list.page.html',
  styleUrls: ['./following-list.page.scss'],
})
export class FollowingListPage implements OnInit {
  followingList =   this._router.getCurrentNavigation().extras.state
  loggedInUserDetail;
  currentUser
  followingUser = false
  constructor(private _router:Router, private _as:AuthService, private _ms:MediaService, public toastController: ToastController) { }

  ngOnInit() {
    // this.followingLis

   
  }

  ionViewWillEnter(){
    this.followingList = history.state

    this._ms.getUser().subscribe(
      res => {
        this.currentUser = res.id
        this.followingList.data.forEach(element => {
        if(element.id === res.id){
          return element.isUser = true
        }
         let x = res.following.filter(x => x.id === element.id).length
         if(x){
           element.followingUser = true
           this.followingUser = true;
         }
        })

        this.followingList.data.forEach(ele => {
          let x = res.followedBy.filter(x => x.id === ele.id).length
          if(x){
            ele.followsyou = true
          }
        })
      }
    )

    this._ms.getUser().subscribe(
      res => this.loggedInUserDetail = res
    )


  }


  detail(data){
    if(data.isUser) return this._router.navigateByUrl('/folder/gallary')
    if(!data.followedBy){
      this._ms.getMediaUser(data.id).subscribe(
        res => {
        
          data.followedBy = res.followedBy;
          data.following = res.following
          data.media = res.media
           this._router.navigateByUrl('/folder/profile', {state:data})

        }
      )
    }else{
    this._router.navigateByUrl('/folder/profile', {state:data})

    }
  }

  async presentToastWithOptions(header, msg) {
    const toast = await this.toastController.create({
      header,
      cssClass: 'my-custom-class',
      message:msg,
      icon: 'information-circle',
      position: 'top',
      mode:'ios',
      animated:true,
      duration: 4000

    });
    await toast.present();
  }

  follow(user){
    if(!this.currentUser) return alert('you must be logged In')
    let data = {
      person: user.id,
      followerId: this.currentUser
    }
    if(!this.followingUser){
      if(!user.followedBy){
        user.followingUser = true
        this._ms.getMediaUser(user.id).subscribe(
          res => {
            user.followedBy = res.followedBy;
          user.following = res.following
          user.media = res.media


            user.followedBy.push(this.loggedInUserDetail)
            this.followingUser = true
             this._ms.follow(data).subscribe(
                res => this.presentToastWithOptions('', 'followed...')
              )
           
          }
        )
      }else{
        user.followedBy.push(this.loggedInUserDetail)

        this.followingUser = true
        user.followingUser = true
         return this._ms.follow(data).subscribe(
           res =>{ this.presentToastWithOptions('', 'followed...')}
         )
      }
    

    
    }
    if(!user.followedBy){
      this._ms.getMediaUser(user.id).subscribe(
        res => {
          user.followedBy = res.followedBy;
          user.following = res.following
          user.media = res.media
          user.followedBy = user.followedBy.filter(x => x.id !== this.loggedInUserDetail.id)
          this.followingUser = false
          user.followingUser = false
           this._ms.follow(data).subscribe(
              res => this.presentToastWithOptions('', 'unfollowed...')
            )
         
        }
      )
    }else{
      user.followedBy = user.followedBy.filter(x => x.id !== this.loggedInUserDetail.id)

      this.followingUser = false
      user.followingUser = false
  
      return this._ms.unfollow(data).subscribe(
        res =>this.presentToastWithOptions('', 'unfollowed...')
      )
    }
   
    

    

  }

}
