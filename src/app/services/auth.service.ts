import { HttpClient } from '@angular/common/http';
import { Token } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { API_CONFIG } from '../config/api.config';
import { Credenciais } from '../models/credenciais';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  jwtService:JwtHelperService = new  JwtHelperService();
  constructor(private http:HttpClient) { }
  
    authenticate (creds:Credenciais){
      return this.http.post(`${API_CONFIG.baseUrl}/login`,creds,{
        observe:'response',
        responseType:'text'
      })
  }
  sucessoLogin(autToken: string){
    localStorage.setItem('token',autToken);
  }
  isAutenticated(){
    let token = localStorage.getItem('token')
     if(token != null ){
        return !this.jwtService.isTokenExpired(token);
     }
     return false;
  }
  logOut(){ 
    localStorage.clear();    
  }
}
