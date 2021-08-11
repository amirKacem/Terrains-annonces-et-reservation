import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private authService:AuthService) { }
  user:User;
  ngOnInit() {
    if(this.authService.loggedIn()){
      this.authService.getCurrentUser().subscribe(
        (user) => {
          this.user = user;
        },
        (error)=> {
          console.log(error);
        }
      )
    }
  
  }

}
