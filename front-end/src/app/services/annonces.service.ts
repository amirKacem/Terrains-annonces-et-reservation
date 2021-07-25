import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Annonce } from '../models/annonce.model';

@Injectable({
  providedIn: 'root'
})
export class AnnoncesService {
  apiUrl="http://127.0.0.1:8000/api";
  constructor(private http:HttpClient) { }

  getAllAnnonces():Observable<Annonce[]>{
    return this.http.get<Annonce[]>(this.apiUrl+"/annonces");
  }
}
