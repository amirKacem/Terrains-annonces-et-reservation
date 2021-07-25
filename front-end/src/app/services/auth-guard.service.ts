import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{
  token:any;
  constructor(private router:Router) { }

  canActivate(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    this.token = localStorage.getItem('token');
    if(this.token){
      return true;
    }else{
       this.router.navigate(['login']);
       return false;
    }
  }
}
