import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Annonce } from '../models/annonce.model';
import { AnnoncesService } from '../services/annonces.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  annonces: Annonce[]=[];

  constructor(private annonceService:AnnoncesService,
              private router:Router,
              private toastr:ToastrService
              ) { }

  ngOnInit() {
    this.annonceService.subject.subscribe(() => {
      this.getAllAnnonces();
    });
    this.getAllAnnonces();
  }

  getAllAnnonces(){
    this.annonceService.getAllAnnonces().subscribe(
      (data)=>{
          this.annonces = data;
      },
      (error) => {
        if(error.status=== 401){
          localStorage.removeItem('token');
          this.router.navigate(['login']);
        }
      }
      )
  }

  reservation(id:string){
    this.annonceService.reservation(id).subscribe(
      (res) => {
        this.toastr.success(res.message,res.status,{
          timeOut:2000,
          progressBar:true
        });
      },
      (error)=> {
        this.toastr.error(error.message,error.status,{
          timeOut:2000,
          progressBar:true
        });
      }
    )
  }

}
