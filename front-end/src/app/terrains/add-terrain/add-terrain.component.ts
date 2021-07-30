import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder,Validators} from '@angular/forms'
import { Terrain } from 'src/app/models/terrain.model';
import { TerrainsService } from 'src/app/services/terrains.service';
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
  constructor(private formBuilder:FormBuilder,private terrainService:TerrainsService) { }

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
    this.terrainService.addTerrain(this.form.value).subscribe((res)=> {
        this.submited=false;
        this.form.reset();
    },error => {
      console.log(error);
    })

 
  }
  
  changeFile(event){
    this.file = event.target.files[0];
    console.log(this.file);
   
  }
}
