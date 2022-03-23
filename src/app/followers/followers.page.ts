import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { combineLatest, Subject, throwError } from 'rxjs';
import { catchError, map, startWith, tap } from 'rxjs/operators';
import { MediaService } from '../media/media.service';


@Component({
  selector: 'app-followers',
  templateUrl: './followers.page.html',
  styleUrls: ['./followers.page.scss'],
})
export class FollowersPage implements OnInit {

  currentUser = ''
  col = 'All'
  plainSearch = ''
  search = false
  errormsg = ''
  User$ = this._ms.getUser().pipe(
    map(x => {
      let arr = []
      let res = x.following
      res.forEach(element => {
        element.media.forEach(ele => {
          arr.push(ele)
        });
      });

      return arr
    }),
    catchError(err => {
      if(err.message === "Unauthorized"){
        
        this.errormsg = ' // see media of only those you follow here';
      }else{
        this.errormsg = 'an unexpected error occured'
      }
      return throwError(err)
    })
   
  )

  private searchedptn = new Subject<string>();
  insertedSearchedptn$ = this.searchedptn.asObservable();

  allMediaWithSearch$ = combineLatest([
    this.User$,
    this.insertedSearchedptn$.pipe(
      startWith('')
    )
  ]).pipe(
    map(([media, md]) => {
      if(md === 'All') return [...media]
      return media.filter((i: { Mediatype: string; }) => md ?  i.Mediatype === md : true)
    })
  )
  constructor(private _ms:MediaService, private _router:Router) { }

  ngOnInit() {
  }

 

  toggleInput(){
    if(this.search){
      this.col = ''
    }
    this.search = !this.search
  }

  plain(event){
    this.searchedptn.next(this.plainSearch)
  }


  fire(data){
    this.plainSearch = ''
    this.col = data
    this.searchedptn.next(data)
  }


  route(data){
    
    this._router.navigateByUrl('/folder/detail', {state: {data, me:false}})

  }

}
