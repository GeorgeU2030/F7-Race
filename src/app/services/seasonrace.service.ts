import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SeasonRace } from '../interfaces/SeasonRace';

@Injectable({
  providedIn: 'root'
})
export class SeasonraceService {

  private endpoint: string = environment.BACKEND_URL;
  private apiUrl: string = this.endpoint + 'SeasonRace';

  constructor(private http:HttpClient) { }

  getRace(id:number):Observable<SeasonRace>{
    return this.http.get<SeasonRace>(this.apiUrl+'/'+id);
  }

  updateRace(race:SeasonRace):Observable<SeasonRace>{
    return this.http.put<SeasonRace>(this.apiUrl+'/', race);
  }

}
