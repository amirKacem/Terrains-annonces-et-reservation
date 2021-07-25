import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { AuthService } from './auth.service';
@Injectable()
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private authService:AuthService) { }

  intercept(req,next){

    let cloneReq = req.clone({
      setHeaders :{
        Authorization: `Bearer ${this.authService.getToken()}`

      }
    });
    return next.handle(cloneReq);
  }
}
