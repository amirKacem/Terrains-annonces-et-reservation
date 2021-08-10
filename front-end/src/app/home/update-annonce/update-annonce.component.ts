import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Annonce } from 'src/app/models/annonce.model';
import { AnnoncesService } from 'src/app/services/annonces.service';

@Component({
  selector: 'app-update-annonce',
  templateUrl: './update-annonce.component.html',
  styleUrls: ['./update-annonce.component.css']
})
export class UpdateAnnonceComponent implements OnInit {

  form:FormGroup;
  submited:boolean=false;
  file:any;
  annonce:Annonce;
  id:string;


  constructor(private formBuilder:FormBuilder,
              private annonceService:AnnoncesService,
              private toastr:ToastrService,
              private activatedRoute:ActivatedRoute,
              private router:Router
              ) { }

  ngOnInit() {
    this.updateAnnonceForm();
  }

  updateAnnonceForm(){
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.annonceService.getAnnonce(this.id).subscribe(
      (annonce) => {
    
        this.annonce = annonce;
   
        this.form = this.formBuilder.group({
          title : [annonce.title,[Validators.required]],
          description:[annonce.description,[Validators.required]],
          start_hour:[annonce.start_hour,[Validators.required]],
          end_hour:[annonce.end_hour,[Validators.required]],
          image:[''],
   
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

  updateAnnonce(){
    this.submited = true;
    this.annonce = this.form.value;
    this.annonce.image = this.file;
    this.annonce.id = this.id;
    if(this.form.invalid){
      return;
    }
    this.annonceService.updateAnnonce(this.annonce).subscribe((res)=> {
        this.submited=false;
        this.toastr.success("L\'annonce a été mis a jour","200",{
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
