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
  
}
