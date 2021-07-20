import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import  {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl="http://127.0.0.1:8000/api";

  constructor(private http:HttpClient) { }

  login(data){
    return this.http.post(this.apiUrl+"/login",data);
  }





}
