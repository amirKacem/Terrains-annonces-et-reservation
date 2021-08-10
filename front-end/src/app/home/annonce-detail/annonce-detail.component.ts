import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Annonce } from 'src/app/models/annonce.model';
import { AnnoncesService } from 'src/app/services/annonces.service';

@Component({
  selector: 'app-annonce-detail',
  templateUrl: './annonce-detail.component.html',
  styleUrls: ['./annonce-detail.component.css']
})
export class AnnonceDetailComponent implements OnInit {

  id:string;
  annonce:Annonce;
  constructor(private activatedRoute: ActivatedRoute,
              private annonceService:AnnoncesService,
              private router:Router
              ) { }

  ngOnInit() {

    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.getAnnonce(this.id);
  }

  getAnnonce(id){
    this.annonceService.getAnnonce(id).subscribe(
      (data)=> {
        console.log(data);
        this.annonce = data;
      
      },
      (error) => {
        console.log(error);
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
