import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http : HttpClient) { }

  getUsers(){
    return this.http.get('http://localhost:3000/user');
  }

  getAdminId(sub : any){
    return this.http.get('http://localhost:3000/user/id/' + sub);
  }

  getUserId(id : any){
    return this.http.get('http://localhost:3000/user/' + id);
  }

}
