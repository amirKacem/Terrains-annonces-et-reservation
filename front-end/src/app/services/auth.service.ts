import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import  {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import { User } from '../models/user.model';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl="http://127.0.0.1:8000/api";

  constructor(private http:HttpClient,private router:Router) { }

  login(data){
    return this.http.post(this.apiUrl+"/login",data);
  }

  signUp(data){
    return this.http.post(this.apiUrl+"/register",data)
  }

  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['/login'])

  }

  setToken(token){
    localStorage.setItem('token',token);
  }

  getToken(){
    return localStorage.getItem('token');
  }

  loggedIn(){
    return localStorage.getItem('token');
  }

  getCurrentUser():Observable<User>{
    return this.http.post<User>(this.apiUrl+"/user/info",{});
  }

  updateUser(user:User):Observable<any>{
    return this.http.put<User>(this.apiUrl+"/user/update",user);
  }



}
