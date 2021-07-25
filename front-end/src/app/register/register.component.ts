import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder,Validators} from '@angular/forms'
import { User } from '../models/user.model';
import { MustMatch } from '../helpers/helpers';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form:FormGroup;
  user:User;
  disabled:Boolean = false;
  errors = [];
  constructor(private formBuilder:FormBuilder,private authService:AuthService) { }

  ngOnInit() {
    this.registerForm()
  }

  registerForm(){
    this.form = this.formBuilder.group({
      first_name : ['',[Validators.required]],
      last_name:['',[Validators.required]],
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required]],
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
  
    
    if(this.form.invalid){
      return;
    }
    this.authService.signUp(this.form.value).subscribe(res => {
        console.log(res);
    },
      ResError => {   
        console.log("ok");
       this.showErrors(ResError)
      }
    );
  }

  showErrors(ResError){
   
    this.errors = ResError.error.errors;
    console.log(this.errors);
  }
}
