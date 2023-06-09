
import { Injectable } from '@angular/core';
import { Animal } from '../Animal';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListService {
  private apiUrl = 'http://localhost:3000/animals'
  private apiUrlPost= 'http://localhost:3000/animals/'
  constructor(private http: HttpClient) { }

  getAdd(value : any) {
    return this.http.post(`${this.apiUrlPost}`, value)
  }
  
  getPut(value: any){
    return this.http.put(`${this.apiUrl}/${value.id}`, value)
  }

  remove(id: number){
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  getAll(): Observable<Animal[]>{
    return this.http.get<Animal[]>(this.apiUrl);
  }

  getItem(id:number): Observable<Animal>{
    return this.http.get<Animal>(`${this.apiUrl}/${id}`);
  }
  
}