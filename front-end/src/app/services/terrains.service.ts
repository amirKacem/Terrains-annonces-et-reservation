import { HttpClient } from '@angular/common/http';
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

  addTerrain(t:Terrain):Observable<Terrain>{
    let formData = this.terrainFormData(t);
    return this.http.post<Terrain>(this.apiUrl+"/terrains",formData).pipe(
      tap( () => {this.subject.next()})
    );
  }

  private terrainFormData(terrain:Terrain){
    let formData = new FormData();
    formData.append('nom',terrain.nom);
    formData.append("image",terrain.image,terrain.image.name);
    formData.append("title",terrain.title);
    formData.append("description",terrain.description);
    formData.append("longueur",terrain.longueur.toString());
    formData.append("largeur",terrain.largeur.toString());
    return formData;
  }
}
