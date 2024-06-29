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

  getBrands():Observable<Brand[]>{
    return this.http.get<Brand[]>(this.apiUrl);
  }
  
}
