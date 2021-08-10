import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MustMatch } from '../helpers/helpers';
import { User } from '../models/user.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {
  form:FormGroup;
  user:User;
  submited:boolean=true;
  errors=[];
  constructor( private toastr:ToastrService,
              private formBuilder:FormBuilder,
              private authService:AuthService,
              private router:Router
          ) { }

  ngOnInit() {
    this.updateUserForm();
  }
  updateUserForm(){
    this.authService.getCurrentUser().subscribe(
      (data) => { 
        this.user=data;
        this.form = this.formBuilder.group({
          first_name : [this.user.first_name,[Validators.required]],
          last_name:[this.user.last_name,[Validators.required]],
          email:[this.user.email,[Validators.required,Validators.email]],
          password:[''],
          cpassword:[''],
          tel:[this.user.tel,[Validators.pattern('^[0-9]+$')]],
          date_birth:[this.user.date_birth],
        },
        {validator: MustMatch('password','cpassword')}
        )
      },(error)=> {
        if(error.status=== 401){
          localStorage.removeItem('token');
          this.router.navigate(['login']);
        }
      }
    )
   
  }

  get f(){
    return this.form.controls;
  }

  updateUser(){
    this.submited= true;
    this.user = this.form.value;
    if(this.form.invalid){
      return;
    }
    this.authService.updateUser(this.user).subscribe(
      (res) => {

        this.submited=false;
        this.errors = [];
        this.toastr.success(res.message,res.status,{
          timeOut:2000,
          progressBar:true
        });
      },
      (error)=> {
        this.showErrors(error);
        
      }
    )
  }

  showErrors(error){
    this.errors = error.error.errors;
  }
}
