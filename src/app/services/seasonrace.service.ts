import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SeasonRace } from '../interfaces/SeasonRace';
import { SeasonRaceResponse } from '../interfaces/SeasonRaceResponse';

@Injectable({
  providedIn: 'root'
})
export class SeasonraceService {

  private endpoint: string = environment.BACKEND_URL;
  private apiUrl: string = this.endpoint + 'SeasonRace';

  constructor(private http:HttpClient) { }

  getRace(id:number):Observable<SeasonRaceResponse>{
    return this.http.get<SeasonRaceResponse>(this.apiUrl+'/'+id);
  }

  updateRace(race:SeasonRace):Observable<SeasonRace>{
    return this.http.put<SeasonRace>(this.apiUrl+'/', race);
  }

}
