import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder,Validators} from '@angular/forms'
import { AuthService } from '../services/auth.service';
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

  constructor(private authService:AuthService,private formBuilder:FormBuilder) { }
  
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
  
    if(this.form.invalid){
      return;
    }
    this.disabled=true;
    this.authService.login(this.form.value).subscribe(res => {  
          this.data = res;
        },
         error => {
           console.log(error)
           
            this.showErrors(error)
         }   
    );
  }
  showErrors(error){
    this.disabled=false;
    this.error = error.message;
  }

}
