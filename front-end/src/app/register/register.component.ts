import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder,Validators} from '@angular/forms'
import { User } from '../models/user.model';
import { MustMatch } from '../helpers/helpers';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form:FormGroup;
  user:User;
  disabled:Boolean = false;
  constructor(private formBuilder:FormBuilder) { }

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
  
    console.log(this.form.value);
    if(this.form.invalid){
      return;
    }
  }
}
