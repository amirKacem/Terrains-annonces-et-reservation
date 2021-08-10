import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,Subject } from 'rxjs';
import  {tap} from 'rxjs/operators';
import { Annonce } from '../models/annonce.model';

@Injectable({
  providedIn: 'root'
})
export class AnnoncesService {
  apiUrl="http://127.0.0.1:8000/api";

  public subject = new Subject<void>(); 
  constructor(private http:HttpClient) { }

  getAllAnnonces():Observable<Annonce[]>{
    return this.http.get<Annonce[]>(this.apiUrl+"/annonces");
  }

  getAnnonce(id):Observable<Annonce>{
    return this.http.get<Annonce>(this.apiUrl+"/annonces/"+id);
  }

  addAnnonce(annonce:Annonce):Observable<any>{
    let formData = this.annonceFormData(annonce);
    return this.http.post<any>(this.apiUrl+"/annonces",formData).pipe(
      tap( () => {this.subject.next()})
    );
  }

  updateAnnonce(annonce:Annonce){
    let formData;
    if(annonce.image!='' && annonce.image!=null){
     
        formData = this.annonceFormData(annonce);
    
      return this.http.post(this.apiUrl+"/annonces/"+annonce.id,formData);
    }else{
      return this.http.put(this.apiUrl+"/annonces/"+annonce.id,annonce);
    }
  }

  private annonceFormData(annonce:Annonce){
    let formData = new FormData();

    formData.append('title',annonce.title);
    formData.append("image",annonce.image,annonce.image.name);
    formData.append("description",annonce.description);
    formData.append("start_hour",annonce.start_hour);
    formData.append("end_hour",annonce.end_hour);
    formData.append('reserved',JSON.stringify(annonce.reserved));
    formData.append('terrain_id',annonce.terrain_id)


    return formData;
  }

  getUserAnnonces():Observable<Annonce[]>{
    return this.http.get<Annonce[]>(this.apiUrl+"/user/annonces");
  }

  deleteAnnonce(id:number):Observable<any>{
      return this.http.delete<any>(this.apiUrl+"/annonces/"+id).pipe(
        tap( () => {this.subject.next()})
      );
  }

  reservation(id:string):Observable<any>{
    return this.http.post<any>(this.apiUrl+"/annonces/"+id+"/reservation",{}).pipe(
      tap( () => {this.subject.next()})
    );
  }
}
