import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { User } from '../interfaces/User';
import { Observable } from 'rxjs';
import { Login } from '../interfaces/Login';
import { Token } from '../interfaces/Token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private endpoint:string = environment.BACKEND_URL;
  private apiUrl:string = this.endpoint + 'Auth';
  
  constructor(private http: HttpClient) { }

  signup(user:User):Observable<User>{
    return this.http.post<User>(`${this.apiUrl}/signup`,user);
  }

  login(userLogin:Login):Observable<Token>{
    return this.http.post<Token>(`${this.apiUrl}/login`, userLogin);
  }

  validateToken(token:string):Observable<any>{
    return this.http.get<Token>(`${this.apiUrl}/validate?token=${token}`);
  }

}
