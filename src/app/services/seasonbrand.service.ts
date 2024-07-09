import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SeasonbrandService {

  private endPoint: string = environment.BACKEND_URL;
  private apiUrl: string = `${this.endPoint}SeasonBrand`;

  constructor(private http: HttpClient) { }

  updateBrand(brandId: number, points:number){
    return this.http.put(this.apiUrl+'/'+brandId, points);
  }
  
}
