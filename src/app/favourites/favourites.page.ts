import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { combineLatest, Subject, throwError } from 'rxjs';
import { map, startWith, tap, catchError } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { MediaService } from '../media/media.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.page.html',
  styleUrls: ['./favourites.page.scss'],
})
export class FavouritesPage implements OnInit {
  currentUser = ''
  search = false
  col = 'All'
  errormsg = ''
  plainSearch = ''
  User$ = this._ms.getUser()

  private searchedptn = new Subject<string>();
  insertedSearchedptn$ = this.searchedptn.asObservable();

  allMediaWithSearch$ = combineLatest([
    this.User$.pipe(
      map(x => {
        return x.favourites
      })
      
    ),
    this.insertedSearchedptn$.pipe(
      startWith('')
    )
  ]).pipe(
    map(([media, md]) => {
      if(this.plainSearch){
        this.col = 'All'
        return media.filter((i: { media: {description:string}; }) => md ?  i.media.description.includes(md) : true)
        

      }
      if(md === 'All') return [...media]
      return media.filter((i: { Mediatype: string; }) => md ?  i.Mediatype === md : true)
    }),
    catchError(err => {
      if(err.message === "Unauthorized"){
        
        this.errormsg = ' //  space for your added favs...';
      }else{
        this.errormsg = 'an unexpected error occured'
      }
      return throwError(err)
    })
  )
  constructor(private _ms: MediaService,private _router:Router, private _as:AuthService) { }

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
    // alert(this.plainSearch)
    this.searchedptn.next(this.plainSearch)
  }


  
  fire(data){
    this.plainSearch = ''
    this.col = data
    this.searchedptn.next(data)
  }

  route(data, id){
    let info = {data, me: false}
    if(id === this.currentUser){
        info.me = true
    }
    
    this._router.navigateByUrl('/folder/detail', {state: info})

  }

}
