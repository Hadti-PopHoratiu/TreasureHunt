import { LocationsService } from './../../services/locations.service';
import { AuthService } from '../../services/auth.service';
import { UsersService } from './../../services/users.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.css']
})
export class LocationsComponent implements OnInit {

  adminId: any;
  locations: any;

  constructor(private adminDetails: UsersService, private locationDetails: LocationsService, public profile: AuthService) { }
  
  ngOnInit() {
    this.profile.userProfile$.source.subscribe(data =>{
      this.adminDetails.getAdminId(data.sub).subscribe(adminData =>{
         this.adminId = (<any>adminData).user_id;
         this.getLocations();
      })
    })
    
    
  }

  deleteLocation(id: any){
    this.locationDetails.deleteLocation(id).subscribe(
      res => { 
        this.getLocations();
      }
    )
  }

  getLocations(){
    this.locationDetails.getLocations(this.adminId).subscribe(locationData=>{
      this.locations = locationData;
    })
  }

}
