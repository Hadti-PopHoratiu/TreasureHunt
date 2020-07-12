import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LocationsService {

  constructor(private http : HttpClient) { }

  getLocations(id: any){
    return this.http.get('http://localhost:3000/locations/'+ id);
  }

  deleteLocation(id: any){
    return this.http.delete('http://localhost:3000/location/delete/'+ id);
  }

  getLocationById(id: any){
    return this.http.get('http://localhost:3000/location/'+ id);
  }

  postLocation(theLocation){
    return this.http.post('http://localhost:3000/location',theLocation);
  }
  putLocation(locationToPut, locationID){
    console.log("Posting the location...");
    return this.http.put('http://localhost:3000/location/' + locationID ,locationToPut);
  }
}
