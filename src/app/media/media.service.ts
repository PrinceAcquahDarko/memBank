import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Imedia } from './interface';
import { environment } from '../../environments/environment.prod';
@Injectable({
  providedIn: 'root'
})
export class MediaService {
  url = environment.url
  cache = {}
  constructor(private http: HttpClient) { }

    getAllMedia(): Observable<any> {
      if(this.cache['allMedia']){
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

    uploadMedia(data:any, description:string){
  //here we check if the media  to be upload alreaady exists
      if(this.cache['allMedia']){
        let all = this.cache['allMedia']

       let media = all.filter(x =>x.description.includes(description) || description.includes(x.description))
       let res = {foundMedia:true, media}
       if(media.length){
         return of(res)
       }
      }

      //the checking ends here
  
      // this.cache['allMedia'] = ''
      return this.http
      .post<any>(this.url + '/media', data)
      .pipe(catchError(this.handleError));
    }

   

    continueUploadMedia(data:any){
      // this.cache['allMedia'] = ''
      
      return this.http
      .post<any>(this.url + '/media', data)
      .pipe(catchError(this.handleError));
    }

    updateLikes(data:any){
      return this.http
      .post<any>(this.url + '/user/likes', data)
      .pipe(catchError(this.handleError));
    }

    rmLikes(data:any){
      return this.http
      .post<any>(this.url + '/user/removelikes', data)
      .pipe(catchError(this.handleError));
    }

    addDislikes(data:any){
      return this.http
      .post<any>(this.url + '/user/adddislikes', data)
      .pipe(catchError(this.handleError));
    }

    rmDislikes(data:any){
      return this.http
      .post<any>(this.url + '/user/removedislikes', data)
      .pipe(catchError(this.handleError));
    }

    addFav(data:any){
      this.cache['user'] = null
      return this.http
      .post<any>(this.url + '/user/addfav', data)
      .pipe(catchError(this.handleError));
    }

    getSingleMedia(data){
      if(this.cache['allMedia']){
        let res =  this.cache['allMedia'].filter(i => i.id === data.id)[0]
        if(res){
          return res
        }

        return data
      }
    }

    rmFav(data:any, media){
     
       this.cache['user'] = null

      
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

    unfollow(data){
      return this.http
      .post<any>(this.url + '/user/unfollow', data)
      .pipe(catchError(this.handleError));
    }

    deleteMedia(id){
      return this.http
      .delete<any>(this.url +  `/media/${id}`)
      .pipe(catchError(this.handleError));
    }

    updateMedia(id, data){
      return this.http
      .patch<any>(this.url +  `/media/${id}`, data)
      .pipe(catchError(this.handleError));
    }


    getMediaUser(id){
      return this.http
      .get<any>(this.url +  `/user/mediaUser/${id}`)
      .pipe(catchError(this.handleError));
    }

    downloadfile(url:string):Observable<Blob>{
      return this.http.get(url, {
        responseType: 'blob'
      })
    }

    updateDownloads(id:number):Observable<any>{
      return this.http
      .get<any>(this.url +  `/user/download/${id}`)
      .pipe(catchError(this.handleError));
    }





    handleError(err: HttpErrorResponse) {
      let message = '';
  
      if (err.error instanceof ErrorEvent) {
        message = `an error occured: ${err.error.message}`;
      } else {
        message = err.error;
      }
  
      return throwError(message);
    }
  }
