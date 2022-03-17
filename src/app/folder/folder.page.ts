import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, Subject, throwError } from 'rxjs';
import { catchError, map, startWith, tap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { MediaService } from '../media/media.service';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})

export class FolderPage implements OnInit {
  errormsg = ''
  currentUser = ''
  col = 'All'
  plainSearch = ''
  search = false
  recievedMedia;
  allMedia$ = this._ms.getAllMedia().pipe(
    tap(x => console.log(x))
  )

  private searchedptn = new Subject<string>();
  insertedSearchedptn$ = this.searchedptn.asObservable();

  allMediaWithSearch$ = combineLatest([
    this.allMedia$,
    this.insertedSearchedptn$.pipe(
      startWith('')
    )
  ]).pipe(
    map(([media, md]) => {
      if(this.plainSearch){
        this.col = 'All'
        return media.filter((i: { description: string; }) => md ?  i.description.includes(md) : true)
      }
      if(md === 'All') return [...media]
      return media.filter((i: { Mediatype: string; }) => md ?  i.Mediatype === md : true)
    }),
    catchError(err => {
      this.errormsg = 'an unexpected error please try again later'
      return throwError(err)
    })
  )

  constructor(private activatedRoute: ActivatedRoute, private _as:AuthService, private r:Router, private _ms:MediaService) { }

  ngOnInit() {
    this._as.getLoggedInUser().subscribe(
      res => {
        this.currentUser = res;
      }
    )
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
    let info = {data, me:false}
    if(data.user.id === this.currentUser){
      info.me = true
    }
    this.r.navigateByUrl('/folder/detail', {state: info})

  }

  //to do

  //change input to text-area in upload
  //make header disappear when scrolling
  //add search to mobile(make it visible)
  //change font-style especaill for detail heading

}
