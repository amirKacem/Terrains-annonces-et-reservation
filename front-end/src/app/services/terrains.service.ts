import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Terrain } from '../models/terrain.model';
import { Observable,Subject } from 'rxjs';
import  {tap} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class TerrainsService {

  apiUrl="http://127.0.0.1:8000/api";
  public subject = new Subject<void>(); 


  constructor(private http:HttpClient) { }

  getAllTerrains():Observable<Terrain[]>{
    return this.http.get<Terrain[]>(this.apiUrl+"/terrains");
  }

  getTerrain(id):Observable<Terrain>{
    return this.http.get<Terrain>(this.apiUrl+"/terrains/"+id);
  }

  addTerrain(t:Terrain):Observable<any>{
    let formData = this.terrainFormData(t);
    return this.http.post<any>(this.apiUrl+"/terrains",formData).pipe(
      tap( () => {this.subject.next()})
    );
  }

  updateTerrain(t:Terrain){
    let formData;
    if(t.image!='' && t.image!=null){
     
       formData = this.terrainFormData(t);
    
      return this.http.post(this.apiUrl+"/terrains/"+t.id,formData);
    }else{
      return this.http.put(this.apiUrl+"/terrains/"+t.id,t);
    }
  }

  private terrainFormData(terrain:Terrain){
    let formData = new FormData();
    console.log(terrain.nom);
    formData.append('nom',terrain.nom);
    formData.append("image",terrain.image,terrain.image.name);
    formData.append("title",terrain.title);
    formData.append("description",terrain.description);
    formData.append("longueur",terrain.longueur.toString());
    formData.append("largeur",terrain.largeur.toString());


    return formData;
  }

  getUserTerrains():Observable<Terrain[]>{
    return this.http.get<Terrain[]>(this.apiUrl+"/user/terrains");
  }

  deleteTerrain(id:number):Observable<any>{
      return this.http.delete<any>(this.apiUrl+"/terrains/"+id).pipe(
        tap( () => {this.subject.next()})
      );
  }
}
