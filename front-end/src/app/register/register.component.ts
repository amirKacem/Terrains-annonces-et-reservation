import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder,Validators} from '@angular/forms'
import { User } from '../models/user.model';
import { MustMatch } from '../helpers/helpers';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form:FormGroup;
  user:User;
  submited:Boolean = false;
  errors = [];
  constructor(private formBuilder:FormBuilder,
              private authService:AuthService,
              private router:Router
              ) { }

  ngOnInit() {
    this.registerForm()
  }

  registerForm(){
    this.form = this.formBuilder.group({
      first_name : ['',[Validators.required]],
      last_name:['',[Validators.required]],
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.minLength(8)]],
      cpassword:['',[Validators.required]],
      tel:['',[Validators.pattern('^[0-9]+$')]],
      date_birth:[''],
      type:['client']
    },
    {validator: MustMatch('password','cpassword')}
    )
  }

  get f(){
    return this.form.controls;
  }
  submit(){
  
    this.submited = true;
    if(this.form.invalid){
      return;
    }
    this.authService.signUp(this.form.value).subscribe(res => {
      this.authService.setToken(res['access_token']);
      this.router.navigateByUrl('/');
    },
      ResError => {   
       this.showErrors(ResError)
      }
    );
  }

  showErrors(ResError){
    this.errors = ResError.error.errors;
  }
}
