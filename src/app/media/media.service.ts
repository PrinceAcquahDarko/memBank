import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Imedia } from './interface';

@Injectable({
  providedIn: 'root'
})
export class MediaService {
  url = 'http://localhost:3000'

  constructor(private http: HttpClient) { }

    getAllMedia(): Observable<any> {
      return this.http
        .get<any>(this.url + '/media')
        .pipe(catchError(this.handleError));
    }

    uploadMedia(data:any){
      return this.http
      .post<any>(this.url + '/media', data)
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
