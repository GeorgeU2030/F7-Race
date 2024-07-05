import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Race } from '../interfaces/Race';

@Injectable({
  providedIn: 'root'
})
export class RaceService {

  private endpoint:string = environment.BACKEND_URL;
  private apiUrl:string = this.endpoint + "Race";

  constructor(private http: HttpClient) { }

  generateRaces(userId:number){
    return this.http.post(`${this.apiUrl}?UserId=${userId}`, {});
  }

  getRaces(userId:number):Observable<Race[]>{
    return this.http.get<Race[]>(`${this.apiUrl}/${userId}`)
  }

}
