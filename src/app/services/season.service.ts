import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Season } from '../interfaces/Season';

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

  addSeason(season:Season):Observable<Season>{
    return this.http.post<Season>(this.apiUrl, season);
  }

}
