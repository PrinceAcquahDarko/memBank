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
  following:boolean
  search: boolean
  plainSearch = ''
  User =   this._router.getCurrentNavigation().extras.state;
  Original = this.User.media
  currentUser = ''
  col = 'All'
  constructor(private _router:Router, private _as:AuthService, private _ms:MediaService) { }

  ngOnInit() {
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
  }

  route(data){
    this._router.navigateByUrl('/folder/detail', {state: data})

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
    let data = {
      person: this.User.id,
      followerId: this.currentUser
    }

    this._ms.follow(data).subscribe(
      res => alert('followed')
    )

  }

}
