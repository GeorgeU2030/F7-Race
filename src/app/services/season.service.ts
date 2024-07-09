import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Season } from '../interfaces/Season';
import { SeasonBrand } from '../interfaces/SeasonBrand';
import { SeasonRace } from '../interfaces/SeasonRace';

@Injectable({
  providedIn: 'root'
})
export class SeasonService {

  private endpoint: string = environment.BACKEND_URL;
  private apiUrl: string = this.endpoint + 'Season';

  constructor(private http:HttpClient) { }

  getSeasons(userId:number):Observable<Season[]>{
    return this.http.get<Season[]>(this.apiUrl+'/'+userId);
  }

  getDetails(id:number):Observable<Season>{
    return this.http.get<Season>(this.apiUrl+'/'+id+'/detail');
  }

  addSeason(season:Season):Observable<Season>{
    return this.http.post<Season>(this.apiUrl, season);
  }

  addTeamtoSeason(seasonId:number, brand:SeasonBrand):Observable<SeasonBrand>{
    return this.http.put<SeasonBrand>(this.apiUrl+'/'+seasonId, brand);
  }

  addRaceToSeason(seasonId:number, race:SeasonRace):Observable<SeasonRace>{
    return this.http.put<SeasonRace>(this.apiUrl+'/'+seasonId+'/races', race)
  }

}
