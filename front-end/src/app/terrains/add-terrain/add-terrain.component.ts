import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder,Validators} from '@angular/forms'
import { Terrain } from 'src/app/models/terrain.model';
import { TerrainsService } from 'src/app/services/terrains.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'add-terrain',
  templateUrl: './add-terrain.component.html',
  styleUrls: ['./add-terrain.component.css']
})
export class AddTerrainComponent implements OnInit {
  form:FormGroup;
  submited:boolean=false;
  file:any;
  terrain:Terrain;
  constructor(private formBuilder:FormBuilder,private terrainService:TerrainsService,private toastr:ToastrService) { }

  ngOnInit() {
    this.addTerrainForm();
  }

  addTerrainForm(){
    this.form = this.formBuilder.group({
      nom : ['',[Validators.required]],
      title:['',[Validators.required]],
      description:['',[Validators.required]],
      largeur:['',[Validators.required,Validators.pattern("^[0-9]+([\.,][0-9]+)?$")]],
      longueur:['',[Validators.required,Validators.pattern("^[0-9]+([\.,][0-9]+)?$")]],
      image:['',[Validators.required]]
    })
  }

  get f(){
    return this.form.controls;
  }

  addTerrain(){
    this.submited = true;
    this.terrain = this.form.value;
    this.terrain.image = this.file;
    if(this.form.invalid){
      return;
    }
    this.terrainService.addTerrain(this.terrain).subscribe((res)=> {
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
    console.log(this.file);
   
  }
}
