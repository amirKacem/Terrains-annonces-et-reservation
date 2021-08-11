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
  data:any;
  error;
  submited:boolean = false;

  constructor(private authService:AuthService,private formBuilder:FormBuilder,private router:Router) { }
  
  loginForm(){
    this.form = this.formBuilder.group({
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required]],
    });
  }

  ngOnInit() {
      
    this.loginForm();
  }

  get f(){
    return this.form.controls;
  }

  submit(){
    this.submited = true;
    if(this.form.invalid){
      return;
    }
    this.authService.login(this.form.value).subscribe(data => {  
          this.authService.setToken(data['access_token']);
          this.router.navigateByUrl('/');
        },
         ResError => {
           this.submited = false;
           
            this.showErrors(ResError)
         }   
    );
  }
  showErrors(res){
    this.error = res.error.error;
  }

}
