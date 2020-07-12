import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ApiService {
  baseUrl: string = "http://04934dc5.ngrok.io";
  constructor(private http: HttpClient) { }

  userVerify(body, token): Observable<any> {
    const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    return this.http.post(`${this.baseUrl}/api/user_verify`, body, {headers: headers});
  }

  getLocations(token): Observable<any> {
    const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    return this.http.get(`${this.baseUrl}/locations`, {headers: headers});
  }

  ping(token, id, data): Observable<any> {
    const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    return this.http.post(`${this.baseUrl}/ping/${id}`, data, {headers: headers});
  }
}