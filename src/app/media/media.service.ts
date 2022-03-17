import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Imedia } from './interface';

@Injectable({
  providedIn: 'root'
})
export class MediaService {
  url = 'http://localhost:3000'
  cache = {}
  constructor(private http: HttpClient) { }

    getAllMedia(): Observable<any> {
      if(this.cache['allMedia']){
        console.log('fetchng from cache')
        return of(this.cache['allMedia'])
      }
      return this.http
        .get<any>(this.url + '/media')
        .pipe(
          tap(x => {
            this.cache['allMedia'] = x
          }),
          catchError(this.handleError)
        );
    }

    uploadMedia(data:any){
      if(this.cache['allMedia']){
        this.cache['allMedia'] = ''
        
      }
      return this.http
      .post<any>(this.url + '/media', data)
      .pipe(catchError(this.handleError));
    }

    updateLikes(data:any){
      console.log(data)
      return this.http
      .post<any>(this.url + '/user/likes', data)
      .pipe(catchError(this.handleError));
    }

    rmLikes(data:any){
      console.log(data)
      return this.http
      .post<any>(this.url + '/user/removelikes', data)
      .pipe(catchError(this.handleError));
    }

    addDislikes(data:any){
      console.log(data)
      return this.http
      .post<any>(this.url + '/user/adddislikes', data)
      .pipe(catchError(this.handleError));
    }

    rmDislikes(data:any){
      console.log(data)
      return this.http
      .post<any>(this.url + '/user/removedislikes', data)
      .pipe(catchError(this.handleError));
    }

    addFav(data:any){
      console.log(data)
      return this.http
      .post<any>(this.url + '/user/addfav', data)
      .pipe(catchError(this.handleError));
    }

    rmFav(data:any){
      console.log(data)
      return this.http
      .post<any>(this.url + '/user/removefav', data)
      .pipe(catchError(this.handleError));
    }

    getUser(){
      if(this.cache['user']){
        return of(this.cache['user'])
      }
      return this.http
      .get<any>(this.url + '/user/userInfo')
      .pipe(tap(x => {
        this.cache['user'] = x
      }),
      catchError(this.handleError)
      );
    }

    follow(data){
      return this.http
      .post<any>(this.url + '/user/followers', data)
      .pipe(catchError(this.handleError));
    }





    handleError(err: HttpErrorResponse) {
      let message = '';
  
      if (err.error instanceof ErrorEvent) {
        console.log(err, 'from an instance');
        message = `an error occured: ${err.error.message}`;
      } else {
        console.log(err, 'from not an instance');
        message = err.error;
      }
  
      return throwError(message);
    }
  }
