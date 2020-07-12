import { Component, OnInit } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import { UsersService } from 'src/app/services/users.service';
import { LocationsService } from 'src/app/services/locations.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

declare const google;

@Component({
  selector: 'create-location',
  templateUrl: './create-location.component.html',
  styleUrls: ['./create-location.component.css']
})
export class CreateLocationComponent implements OnInit {

  constructor(
    private loader: MapsAPILoader,
    private adminDetails: UsersService,
    private locationDetails: LocationsService,
    public profile: AuthService,
    private router: Router
  ) { }

  adminId: any;
  alertMap = false;
  theRanchPolygon;
  message = '';
  zoom = 15;

  // Center of the ranch, where the initial marker will be placed
  center = {
    lat: 47.074085,
    lng: 21.905465,
  };

  getAdminId() {
    this.profile.userProfile$.source.subscribe(data => {
      this.adminDetails.getAdminId(data.sub).subscribe(adminData => {
        this.adminId = (<any>adminData).user_id;
      })
    })
  }

  ngOnInit() {
    this.getAdminId();

    // Wait for the google maps script to be loaded before using the "google" keyword
    this.loader.load().then(() => {
      this.theRanchPolygon = new google.maps.Polygon({ paths: this.polygon });
    });
  }

  submit(form) {
    if (this.polygon.length != 0) {
      let postLocationStructure = {
        name: form.value['locationName'],
        admin_id: this.adminId,
        adress: form.value['adress'],
        boundary: 0,
        type: "poi",
        shape: {
          typeOfStruct: "Polygon",
          additionalPoints: this.polygon,
        }
      }

      if (this.polygon.length == 1)
        postLocationStructure.shape.typeOfStruct = "Point";

      console.log("Start posting the location...");

      this.locationDetails.postLocation(postLocationStructure).subscribe(
        res => { this.router.navigate(['/locations']) },
        err => { console.log(err) }
      );

      this.alertMap = false;
    }
    else {
      this.alertMap = true;
    }
  }

  onMapReady(map) {
    this.initDrawingManager(map);
  }

  initDrawingManager(map: any) {
    let options = {
      drawingControl: true,
      drawingControlOptions: {
        drawingModes: ["polygon"]
      },
      polygonOptions: {
        draggable: false,
        editable: false
      },
      drawingMode: google.maps.drawing.OverlayType.POLYGON
    };

    const drawingManager = new google.maps.drawing.DrawingManager(options);
    drawingManager.setMap(map);

    google.maps.event.addListener(drawingManager, 'overlaycomplete', (event) => {
      if (event.type === google.maps.drawing.OverlayType.POLYGON) {
        let points = event.overlay.getPath().getArray();

        for (let element of points)
          this.polygon.push(this.getCoordonate(element));
      }
    });
  }

  getCoordonate(element) {
    return { lat: element.lat(), lng: element.lng() };
  }

  // This array of latLngs represents the polygon around our ranch
  polygon = [];
}
class shapeStruct {
  lat: Number;
  lng: Number;
}
