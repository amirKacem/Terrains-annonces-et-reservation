import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
@Injectable()
export class TokenInterceptorService implements HttpInterceptor {

  constructor() { }

  intercept(req,next){

    let cloneReq = req.clone({
      setHeaders :{
        Authorization: `Bearer xx.yy.zzz`

      }
    });
    return next.handle(cloneReq);
  }
}
