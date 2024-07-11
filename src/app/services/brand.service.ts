import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { Brand } from '../interfaces/Brand';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  private endpoint:string = environment.BACKEND_URL;
  private apiUrl:string = this.endpoint + 'Brand';
  
  constructor(private http: HttpClient) { }

  generateBrands(userId:number){
    return this.http.post(`${this.apiUrl}?UserId=${userId}`, {});
  }

  getBrands(userId:number):Observable<Brand[]>{
    return this.http.get<Brand[]>(this.apiUrl+'/'+userId);
  }

  updateStats(userId:number, brandname:string, isWinner:boolean){
    return this.http.put(`${this.apiUrl}/stats?UserId=${userId}&seasonBrandName=${brandname}&isWinner=${isWinner}`, {});
  }

  updatePoints(userId:number, brandname:string, points:number){
    return this.http.put(`${this.apiUrl}/points?UserId=${userId}&seasonBrandName=${brandname}&points=${points}`, {});
  }

  champion(userId:number, brandname:string){
    return this.http.put(`${this.apiUrl}/champion?UserId=${userId}&seasonBrandName=${brandname}`, {});
  }

  trophies(userId:number, brandname:string, racename:string){
    return this.http.put(`${this.apiUrl}/trophies?UserId=${userId}&seasonBrandName=${brandname}&raceName=${racename}`, {});
  }
  
}
