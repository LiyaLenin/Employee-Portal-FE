import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserSchema } from '../Models/userSchema';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  SERVER_URL:string='http://localhost:3000'
  constructor(private http:HttpClient) { }
  addUserAPI(user:UserSchema){
   return this.http.post(`${this.SERVER_URL}/users`,user)
  }
}
