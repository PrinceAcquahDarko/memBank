import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { MediaService } from '../media/media.service';


@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  likesColor: boolean
  dislikesColor: boolean
  favColor: boolean
  favId:number;
  userId= ''

  receivedMedia =   this._router.getCurrentNavigation().extras.state.data
  ifOwner = this._router.getCurrentNavigation().extras.state.me
  obj = {
    mediaId: this.receivedMedia.id,
    userId: ''
  }
  fav = {
    mediaId:'',
    userId: ''
  }
  constructor(private _router:Router, private _as:AuthService, private _ms:MediaService) { }

  ngOnInit() {
    this._as.getLoggedInUser().subscribe(
      res => {
        this.userId = res;

        if(this.receivedMedia.Favourites.length){
          this.receivedMedia.Favourites.forEach(media => {
            if(media.userId === this.userId){
              this.favColor = true;
              this.fav.mediaId = media.id
              console.log(media.id, 'from media.id')
            }
          });
        }

        
    if(this.receivedMedia.likes.length){
      this.receivedMedia.likes.forEach(element => {
        if (element === this.userId){
          this.likesColor = true
        }
      });
    }

    if(this.receivedMedia.dislikes.length){
      this.receivedMedia.dislikes.forEach(element => {
        if (element === this.userId){
          this.dislikesColor = true
        }
      });
    }
      }
    )

  }

  likes(){
    this.obj.userId = this.userId
    
    if(this.dislikesColor){
      this.dislikesColor = false;
      // this.receivedMedia.dislikes.length -= 1
      // alert('we removing from dislikes')
      this.receivedMedia.dislikes = this.receivedMedia.dislikes.filter(x => x !== this.obj.userId)

      this._ms.rmDislikes(this.obj)
    }
    this.likesColor = !this.likesColor
   
    if(this.likesColor){
      //add to likes
      // this.receivedMedia.likes.length += 
      this.receivedMedia.likes.push(this.obj.userId)
     
      this._ms.updateLikes(this.obj).subscribe()
      // alert('we adding to likes')
    }else{
      //remove from likes
      // this.receivedMedia.likes.length -= 1
      this.receivedMedia.likes = this.receivedMedia.likes.filter(x => x !== this.obj.userId)
      this._ms.rmLikes(this.obj).subscribe()
    }
  }

  dislikes(){
    this.obj.userId = this.userId
    if(this.likesColor){
      this.likesColor = false;
      // this.receivedMedia.likes.length -= 1
      // alert('we removing from likes')
      this._ms.rmLikes(this.obj).subscribe()
      this.receivedMedia.likes = this.receivedMedia.likes.filter(x => x !== this.obj.userId)

    }

    this.dislikesColor = !this.dislikesColor
    if(this.dislikesColor){
      //add to likes
      // this.receivedMedia.dislikes.length += 1
      alert('we adding to dislikes')
      this.receivedMedia.dislikes.push(this.obj.userId)
      this._ms.addDislikes(this.obj).subscribe()
    }else{
      //remove from likes
      // this.receivedMedia.dislikes.length -= 1
      this.receivedMedia.dislikes = this.receivedMedia.dislikes.filter(x => x !== this.obj.userId)

      alert('we removing from dislikes')
      this._ms.rmDislikes(this.obj).subscribe()
    }


  }

  addFav(){
    this.favColor = !this.favColor
  let obj = {
    mediaId: this.receivedMedia.id,
    userId: this.userId
    }
    

    if(this.favColor){
     
      
      this._ms.addFav(obj).subscribe(
        res => {
          this.receivedMedia.Favourites.push(res)

        }
      )

    }else{
      this.rmFav()
    }
  }


  rmFav(){
    this.fav.userId = this.userId
    this.receivedMedia.Favourites =  this.receivedMedia.Favourites.filter(x => x.userId !== this.userId)
    this._ms.rmFav(this.fav).subscribe(
      res => console.log(res, 'from res hmmm')
    )
  }

  route(){
    // if(!data) return this._router.navigateByUrl('/folder/gallary')
    if(this.ifOwner) return this._router.navigateByUrl('/folder/gallary')
    this._router.navigateByUrl('/folder/profile', {state: this.receivedMedia.user})

  }

}
