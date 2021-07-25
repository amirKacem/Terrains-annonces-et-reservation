import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder,Validators} from '@angular/forms'
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form:FormGroup;
  disabled :Boolean = false;
  data:any;
  token:any;
  error;

  constructor(private authService:AuthService,private formBuilder:FormBuilder,private router:Router) { }
  
  loginForm(){
    this.form = this.formBuilder.group({
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required]],
    });
  }

  ngOnInit() {
    if(this.authService.loggedIn()){
        this.router.navigate(['']);
    }
    this.loginForm();
  }

  get f(){
    return this.form.controls;
  }

  submit(){
  
    if(this.form.invalid){
      return;
    }
    this.disabled=true;
    this.authService.login(this.form.value).subscribe(res => {  
          this.authService.setToken(res.access_token);
          this.router.navigateByUrl('/');
        },
         ResError => {   
            this.showErrors(ResError)
         }   
    );
  }
  showErrors(res){
    this.disabled=false;
    this.error = res.error.error;
  }

}
