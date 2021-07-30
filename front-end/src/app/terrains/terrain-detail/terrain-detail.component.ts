import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { Terrain } from 'src/app/models/terrain.model';
import { TerrainsService } from 'src/app/services/terrains.service';

@Component({
  selector: 'app-terrain-detail',
  templateUrl: './terrain-detail.component.html',
  styleUrls: ['./terrain-detail.component.css']
})
export class TerrainDetailComponent implements OnInit {
  id:string;
  terrain:Terrain;
  constructor(private activatedRoute: ActivatedRoute,
              private TerrainService:TerrainsService,
              private router:Router
              ) { }

  ngOnInit() {

    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.getTerrain(this.id);
  }

  getTerrain(id){
    this.TerrainService.getTerrain(id).subscribe(
      (data)=> {
        this.terrain = data;
        console.log(this.terrain);
      },
      (error) => {

        if(error.status===404){
          this.router.navigate(['/']);
        }
        if(error.status=== 401){
          localStorage.removeItem('token');
          this.router.navigate(['login']);
        }
      }
    )
  }

}
