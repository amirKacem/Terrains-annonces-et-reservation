import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Terrain } from '../models/terrain.model';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TerrainsService {

  apiUrl="http://127.0.0.1:8000/api";
  constructor(private http:HttpClient) { }

  getAllTerrains():Observable<Terrain[]>{
    return this.http.get<Terrain[]>(this.apiUrl+"/terrains");
  }
}
