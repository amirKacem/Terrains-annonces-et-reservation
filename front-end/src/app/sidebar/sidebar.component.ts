import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  user:User;
  constructor(private authService:AuthService) { }

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
