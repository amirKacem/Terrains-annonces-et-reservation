import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Annonce } from '../models/annonce.model';
import { AnnoncesService } from '../services/annonces.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  annonces: Annonce[]=[];

  constructor(private annonceService:AnnoncesService,private router:Router) { }

  ngOnInit() {

    this.getAllAnnonces();
  }

  getAllAnnonces(){
    this.annonceService.getAllAnnonces().subscribe(
      (data)=>{
          console.log(data);
      },
      (error) => {
        if(error.status=== 401){
          localStorage.removeItem('token');
          this.router.navigate(['login']);
        }
      }
      )
  }

}
