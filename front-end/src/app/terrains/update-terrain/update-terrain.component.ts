import { Component, OnInit } from '@angular/core';
import { Terrain } from 'src/app/models/terrain.model';
import { TerrainsService } from 'src/app/services/terrains.service';
import { ToastrService } from 'ngx-toastr';
import {FormGroup,FormBuilder,Validators} from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-terrain',
  templateUrl: './update-terrain.component.html',
  styleUrls: ['./update-terrain.component.css']
})
export class UpdateTerrainComponent implements OnInit {
  
  form:FormGroup;
  submited:boolean=false;
  file:any;
  terrain:Terrain;
  id:string;


  constructor(private formBuilder:FormBuilder,
              private terrainService:TerrainsService,
              private toastr:ToastrService,
              private activatedRoute:ActivatedRoute,
              private router:Router
              ) { }

  ngOnInit() {
    this.updateTerrainForm();
  }

  updateTerrainForm(){
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.terrainService.getTerrain(this.id).subscribe(
      (terrain) => {
    
        this.terrain = terrain;
   
        this.form = this.formBuilder.group({
          nom : [terrain.nom,[Validators.required]],
          title:[terrain.title,[Validators.required]],
          description:[terrain.description,[Validators.required]],
          largeur:[terrain.largeur,[Validators.required,Validators.pattern("^[0-9]+([\.,][0-9]+)?$")]],
          longueur:[terrain.longueur,[Validators.required,Validators.pattern("^[0-9]+([\.,][0-9]+)?$")]],
          image:['']
        })
      },
      (error) => {

        if(error.status===404){
          this.router.navigate(['/']);
        }
        if(error.status=== 403){
          this.router.navigate(['/']);
        }
      }
    )

  }

  get f(){
    return this.form.controls;
  }

  updateTerrain(){
    this.submited = true;
    this.terrain = this.form.value;
    this.terrain.image = this.file;
    this.terrain.id = this.id;
    if(this.form.invalid){
      return;
    }
    this.terrainService.updateTerrain(this.terrain).subscribe((res)=> {
        this.submited=false;
        this.toastr.success("Le terrain a été mis a jour","200",{
          timeOut:2000,
          progressBar:true
        });
    },error => {

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
