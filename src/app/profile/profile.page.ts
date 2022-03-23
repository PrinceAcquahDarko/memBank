import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { MediaService } from '../media/media.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  following= false
  search: boolean
  plainSearch = ''
  User =   this._router.getCurrentNavigation().extras.state;
  Original = this.User.media
  currentUser = ''
  col = 'All'
  loggedInUserDetail;
  constructor(private _router:Router, private _as:AuthService, private _ms:MediaService) { }

  ngOnInit() {

    this._ms.getUser().subscribe(
      res => this.loggedInUserDetail = res
    )
  }

  route(data){
    this._router.navigateByUrl('/folder/detail', {state: data})

  }
  ionViewWillEnter(){
    this.User = history.state
    this.following = false
    this._as.getLoggedInUser().subscribe(
      res => {
        this.currentUser = res;
        this.User.followedBy.forEach(follower =>{
          if(follower.id === this.currentUser){
            this.following = true
          }
        })
      }
    )

   
    
    if(this.User && !this.User.followedBy){
      //get a user from backend
      this._ms.getMediaUser(this.User.id).subscribe(
        res => {
          this.User = res;
          this.Original = this.User.media
          this.User.followedBy.forEach(follower =>{
            if(follower.id === this.currentUser){
              this.following = true
            }
          })
          return
        }
      )
    }
    this.Original = this.User.media


  }

  toggleInput(){
    if(this.search){
      this.col = 'All'
      this.User.media = this.Original
    }
    this.search = !this.search
  }

  plain(event){
    this.col ='All'
    // this.User.media = this.User.media.filter(x => x.description === this.plainSearch)
    this.User.media = this.User.media.filter((i: { description: string; }) => this.plainSearch ?  i.description.includes(this.plainSearch) : this.Original)
  }
  
  fire(data){
    this.User.media = this.Original
    if(data === 'All'){
      return this.User.media = this.Original
    }
    this.col = data
    let x =this.User.media.filter(x => x.Mediatype === data)
    this.User.media = x
  }

  follow(){
    if(!this.currentUser) return alert('you must be logged In')
    let data = {
      person: this.User.id,
      followerId: this.currentUser
    }
    if(!this.following){
     this.User.followedBy.push(this.loggedInUserDetail)
     this.following = true
      return this._ms.follow(data).subscribe(
        res => alert('followed')
      )

    
    }
    this.User.followedBy = this.User.followedBy.filter(x => x.id !== this.loggedInUserDetail.id)

    this.following = false
    return this._ms.unfollow(data).subscribe(
      res => alert('unfollowed')
    )
    

    

  }

  followedBy(data, id){
    let info = {data,id}
    this._router.navigateByUrl('/follwers-list', {state:info})
  }

  followingList(data, id){
    let info = {data,id}
    this._router.navigateByUrl('/following-list', {state:info})
  }

}
