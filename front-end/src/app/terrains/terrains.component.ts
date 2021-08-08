import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Terrain } from '../models/terrain.model';
import { TerrainsService } from '../services/terrains.service';

@Component({
  selector: 'app-terrains',
  templateUrl: './terrains.component.html',
  styleUrls: ['./terrains.component.css']
})
export class TerrainsComponent implements OnInit {
  terrainNom:string;
  terrains: Terrain[]=[];
  terrainsFilter:Terrain[];
  constructor(private terrainService:TerrainsService,private router:Router) { }

  ngOnInit() {

    this.terrainService.subject.subscribe(() => {
      this.getAllTerrains();
    });
    this.getAllTerrains();
  }

  getAllTerrains(){
    this.terrainService.getAllTerrains().subscribe(
      (data)=>{
        this.terrains = data;
        this.terrainsFilter = data;
    },
    (error) => {
      if(error.status=== 401){
        localStorage.removeItem('token');
        this.router.navigate(['login']);
      }
    }
    )
  }

  search(){
    
    this.terrainsFilter = this.terrains.filter((terrain)=>{
      return terrain.nom.indexOf(this.terrainNom)!=-1;
    })

  }

}
