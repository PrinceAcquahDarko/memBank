import { Injectable, NgModule } from '@angular/core';
import {Observable, from} from 'rxjs';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { HTTP_INTERCEPTORS} from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';


@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
    constructor(private _storage:Storage){}
    intercept(req: HttpRequest<any>, next: HttpHandler):
        Observable<HttpEvent<any>> {
            return from(this.handle(req,next))
        }

        async handle (req: HttpRequest<any>, next: HttpHandler) {
            let userInfo = await this._storage.get('token')
            if (userInfo) {
                const newReq = req.clone (
                    {
                        headers: req.headers.set('Authorization', 'Bearer ' +  userInfo)
                    }
                );
                return next.handle(newReq).toPromise();
            }
            else {
                return next.handle(req).toPromise();
            }
        }

    
};

@NgModule({
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpRequestInterceptor,
            multi: true
        }
    ]
})
export class HttpInterceptorModule {}