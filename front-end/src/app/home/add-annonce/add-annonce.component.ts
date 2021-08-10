import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Annonce } from 'src/app/models/annonce.model';
import { Terrain } from 'src/app/models/terrain.model';
import { AnnoncesService } from 'src/app/services/annonces.service';
import { TerrainsService } from 'src/app/services/terrains.service';

@Component({
  selector: 'add-annonce',
  templateUrl: './add-annonce.component.html',
  styleUrls: ['./add-annonce.component.css']
})
export class AddAnnonceComponent implements OnInit {

  constructor(private formBuilder:FormBuilder,
              private annonceService:AnnoncesService,
              private terrainService:TerrainsService,
              private toastr:ToastrService) { }


  form:FormGroup;
  submited:boolean=false;
  file:any;
  terrains:Terrain[];
  annonce:Annonce;

  ngOnInit() {
    this.getAllterrains();
    this.addAnnonceForm();
  }

  getAllterrains(){
    this.terrainService.getAllTerrains().subscribe(
      (data)=>{
        this.terrains = data;
        this.form.controls.terrain_id.setValue(this.terrains[0].id);
    });
  }

  addAnnonceForm(){
    this.form = this.formBuilder.group({
      title : ['',[Validators.required]],
      description:['',[Validators.required]],
      start_hour:['',[Validators.required]],
      end_hour:['',[Validators.required]],
      image:['',[Validators.required]],
      terrain_id:[]
    })
  }

  get f(){
    return this.form.controls;
  }

  addAnnonce(){
    this.submited = true;
    this.annonce = this.form.value;
    this.annonce.image = this.file;
    this.annonce.reserved = false;
    if(this.form.invalid){
      return;
    }
    this.annonceService.addAnnonce(this.annonce).subscribe((res)=> {
        this.submited=false;
        this.form.reset();
        this.toastr.success(res.message,"200",{
          timeOut:2000,
          progressBar:true
        });
    },error => {
      console.log(error);
      this.toastr.error("Error",error.status,{
        timeOut:2000,
        progressBar:true
      });
    })

 
  }
  
  changeFile(event){
    this.file = event.target.files[0];   
  }


}
