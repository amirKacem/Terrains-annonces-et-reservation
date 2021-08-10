import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { ToastrService } from 'ngx-toastr';
import { AnnoncesService } from '../services/annonces.service';
import { Annonce } from '../models/annonce.model';
@Component({
  selector: 'app-user-annonces',
  templateUrl: './user-annonces.component.html',
  styleUrls: ['./user-annonces.component.css']
})
export class UserAnnoncesComponent implements OnInit {

  annonces: Annonce[]=[];
  constructor(private annonceService:AnnoncesService,
              private router:Router,
              private toastr:ToastrService
              
              ) { }

  ngOnInit() {

    this.annonceService.subject.subscribe(() => {
      this.getUserAnnonces();
    });
    this.getUserAnnonces();
  }

  getUserAnnonces(){
    this.annonceService.getUserAnnonces().subscribe(
      (data)=>{

        this.annonces = data;
       
    },
    (error) => {
      if(error.status=== 401){
      
        this.router.navigate(['/']);
      }
    }
    )
  }

  confirmDelete(id){

    Swal.fire({
      title: 'Voulez-vous vraiment supprimer ?',
      icon: 'warning',
      customClass:{
        title:'fs-4',
        icon:'border border-danger text-danger',
        confirmButton:'bg-danger'
      },
      showCancelButton: true,
      confirmButtonText: 'Oui',
      cancelButtonText: 'Non'
    }).then((result) => {
      if (result.value) {
        this.deleteTerrain(id);
      }

    })
   
  }

  deleteTerrain(id){
    this.annonceService.deleteAnnonce(id).subscribe(
      (data) => {
        this.toastr.success(data.message,"200",{
          timeOut:2000,
          progressBar:true
        });
      },
      (error) => {
        this.toastr.error(error.message,"400",{
          timeOut:2000,
          progressBar:true
        });
      }
    )
  }

}
