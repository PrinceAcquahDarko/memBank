import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
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
 
  dshow = false;
  show = false
  receivedMedia =   this._router.getCurrentNavigation().extras.state?.data || JSON.parse(localStorage.getItem('detail'))
  ifOwner = this._router.getCurrentNavigation().extras.state?.me
  obj = {
    mediaId: this.receivedMedia.id,
    userId: ''
  }
  fav = {
    mediaId:'',
    userId: ''
  }
  constructor(private _router:Router, private _as:AuthService, private _ms:MediaService, public toastController: ToastController) { }

  ngOnInit() {
    if(this.receivedMedia){
      localStorage.setItem('detail', JSON.stringify(this.receivedMedia))
    }

  }

  ionViewWillEnter(){
      //want to interract with the main media rather
    this.receivedMedia =   this._ms.getSingleMedia(this.receivedMedia)
    this._ms.getUser().subscribe(
      res => {
        this.userId = res.id;
        this.checkDislikes()
        this.checkFavs()
        this.checkLikes()

      }
    )
  

  }

  checkLikes(){
    if(this.receivedMedia.likes.length){
      this.receivedMedia.likes.forEach(element => {
        if (element === this.userId){
          this.likesColor = true
        }
      });
    }
  }

  checkDislikes(){
    
    if(this.receivedMedia.dislikes.length){
      this.receivedMedia.dislikes.forEach(element => {
        if (element === this.userId){
          this.dislikesColor = true
        }
      });
    }
  }

  checkFavs(){
    if(this.receivedMedia.Favourites.length){
      this.receivedMedia.Favourites.forEach(media => {
        if(media.userId === this.userId){
          this.favColor = true;
          this.fav.mediaId = media.id
         
        }
      });
    }
  }

  likes(){
    if(!this.userId) return this.presentToastWithOptions('like', 'you must be logged in to  like')
    this.obj.userId = this.userId
    
    if(this.dislikesColor){
      this.dislikesColor = false;
      this.receivedMedia.dislikes = this.receivedMedia.dislikes.filter(x => x !== this.obj.userId)

      this._ms.rmDislikes(this.obj)
    }
    this.likesColor = !this.likesColor
   
    if(this.likesColor){
      this.receivedMedia.likes.push(this.obj.userId)
     
      this._ms.updateLikes(this.obj).subscribe()
    }else{
      this.receivedMedia.likes = this.receivedMedia.likes.filter(x => x !== this.obj.userId)
      this._ms.rmLikes(this.obj).subscribe()
    }
  }

  

  download(data){
    this.dshow = true
    this._ms.downloadfile(data.link).subscribe(
      blob =>{
        const a = document.createElement('a');
        const objectURL = URL.createObjectURL(blob)
        a.href = objectURL
        let x = data.link.indexOf('files')
        let newVal = data.link.slice(x+6)
        a.download = newVal
        a.click();
        URL.revokeObjectURL(objectURL)
        this.dshow = false
      }
    )

    this._ms.updateDownloads(data.id).subscribe(res => {})
  }

 

  dislikes(){
    if(!this.userId) return this.presentToastWithOptions('dislike', 'you must be logged in to dislike')
    
    this.obj.userId = this.userId
    if(this.likesColor){
      this.likesColor = false;
      
      this._ms.rmLikes(this.obj).subscribe()
      this.receivedMedia.likes = this.receivedMedia.likes.filter(x => x !== this.obj.userId)

    }

    this.dislikesColor = !this.dislikesColor
    if(this.dislikesColor){
      //add to likes
      // this.receivedMedia.dislikes.length += 1
      // alert('we adding to dislikes')
      this.receivedMedia.dislikes.push(this.obj.userId)
      this._ms.addDislikes(this.obj).subscribe()
    }else{
      //remove from likes
      // this.receivedMedia.dislikes.length -= 1
      this.receivedMedia.dislikes = this.receivedMedia.dislikes.filter(x => x !== this.obj.userId)

      // alert('we removing from dislikes')
      this._ms.rmDislikes(this.obj).subscribe()
    }


  }

  addFav(){
    if(!this.userId) return this.presentToastWithOptions('fav', 'you must be logged in to add a fav')

    this.favColor = !this.favColor
  let obj = {
    mediaId: this.receivedMedia.id,
    userId: this.userId
    }
    

    if(this.favColor){
      this._ms.addFav(obj).subscribe(
        res => {
          this.receivedMedia.Favourites.push(res)
          this.fav.mediaId = res.mediaId
          return this.presentToastWithOptions('fav', 'added to favs')

        }
      )

    }else{
      this.rmFav()
    }
  }


  rmFav(){
    if(!this.userId) return this.presentToastWithOptions('fav', 'you must be logged in to remove from fav')

    this.fav.userId = this.userId
    // this.fav.mediaId = this.receivedMedia.id
    this.receivedMedia.Favourites =  this.receivedMedia.Favourites.filter(x => x.userId !== this.userId)
    this._ms.rmFav(this.fav,this.receivedMedia).subscribe(
      res =>  this.presentToastWithOptions('fav', 'removed from favs')
    )
  }

  route(){
    // if(!data) return this._router.navigateByUrl('/folder/gallary')
    if(this.ifOwner) return this._router.navigateByUrl('/folder/gallary')
    this._router.navigateByUrl('/folder/profile', {state: this.receivedMedia.user})

  }

  async presentToastWithOptions(header, msg) {
    const toast = await this.toastController.create({
      header,
      message:msg,
      cssClass: 'my-custom-class',
      icon: 'information-circle',
      position: 'top',
      duration: 4000,
      mode:'ios',
      animated:true

    });
    await toast.present();
  }

  delete(){
    this.show = true
    this._ms.deleteMedia(this.receivedMedia.id).subscribe(
      res => {
        let info = {media:this.receivedMedia.id, me:true}
        this.show = false
        this._router.navigateByUrl('/folder/home', {state: info})
      },
      err => {
        // alert('couldnt delete')
        this.show =false
      }
    )
  }

  update(){

    //route with state
    this._router.navigateByUrl('/folder/upload', {state: {media: this.receivedMedia}})
  }

}
