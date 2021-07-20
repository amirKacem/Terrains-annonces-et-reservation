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
  submited=false;
  data:any;
  token:any;

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

    this.submited=true;
    if(this.form.invalid){
      return;
    }
    this.authService.login(this.form.value).subscribe(res => {
      console.log(res);
      this.data = res;
    });
  }

}
