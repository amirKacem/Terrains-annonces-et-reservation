import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Terrain } from '../models/terrain.model';
import { TerrainsService } from '../services/terrains.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
@Component({
  selector: 'app-user-terrains',
  templateUrl: './user-terrains.component.html',
  styleUrls: ['./user-terrains.component.css']
})
export class UserTerrainsComponent implements OnInit {
  terrains: Terrain[]=[];
  constructor(private terrainService:TerrainsService,
              private router:Router,
              private toastr:ToastrService
              
              ) { }

  ngOnInit() {

    this.terrainService.subject.subscribe(() => {
      this.getUserTerrains();
    });
    this.getUserTerrains();
  }

  getUserTerrains(){
    this.terrainService.getUserTerrains().subscribe(
      (data)=>{
        console.log(data);
        this.terrains = data;
       
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
    this.terrainService.deleteTerrain(id).subscribe(
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
