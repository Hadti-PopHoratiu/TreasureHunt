import { Component, OnInit } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import { PusherService } from '../../services/pusher.service';
import { UsersService } from 'src/app/services/users.service';
import { LocationsService } from 'src/app/services/locations.service';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

declare const google;

@Component({
  selector: 'location-details',
  templateUrl: './location-details.component.html',
  styleUrls: ['./location-details.component.css']
})
export class LocationDetailsComponent implements OnInit {

  isPost = true;

  locationId: any;
  location: any;
  text: string;
  postLocationStructure = {
    id: "",
    name: "",
    admin_id: "",
    adress: "",
    boundary: 0,
    type: "poi",
    shape: null
  }

  // This array of latLngs represents the polygon around our ranch
  polygon = [];
  constructor(
    private route: ActivatedRoute,
    private loader: MapsAPILoader,
    private pusher: PusherService,
    private locationDetails: LocationsService,
    public profile: AuthService,
    private toastr: ToastrService,
    private router: Router) { }

  theRanchPolygon;
  message = '';
  showAlert = false;
  showLocationUpdate = false;
  zoom = 15;

  center = {
    lat: 6.435838,
    lng: 3.451384,
  };

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.locationId = params['id'];

    })
    this.ngOnInitMap();
  }

  ngOnInitMap() {
    this.loader.load().then(() => {
      this.theRanchPolygon = new google.maps.Polygon({ paths: this.polygon });
    });
    const channel = this.pusher.init();
    channel.bind('ping', (position) => {
      this.center = {
        ...position,
      };
      // Create a LatLng using the position returned from the pusher event
      const latLng = new google.maps.LatLng(position);
      this.showLocationUpdate = true;
      this.message = "The user's location has changed";
      // Check if the location is outside the polygon
      if (!google.maps.geometry.poly.containsLocation(latLng, this.theRanchPolygon)) {
        // Show alert if user has left the polygon
        this.showAlert = true;
      } else {
        this.message = 'The user is currently in the ranch';
      }
    });
  }

  onPutSubmit() {
    this.isPost = false;
    this.locationDetails.putLocation(this.postLocationStructure, this.location._id).subscribe(
      res => { console.log("It's ok. You put the location"); this.isPost = true; this.toastr.success('Succesfully!', 'Update location:'); },
      err => { console.log(err); this.toastr.error('Error!', 'Update location:'); }
    );
    window.scrollTo(0, 0);
    // console.log(this.postLocationStructure);
  }

  onMapReady(map) {
    this.locationDetails.getLocationById(this.locationId).subscribe(data => {
      this.location = data;

      this.postLocationStructure = {
        id: this.location._id,
        name: this.location.name,
        admin_id: this.location.admin_id,
        adress: this.location.adress,
        boundary: this.location.boundary,
        type: this.location.type,
        shape: this.location.shape,
      }

      this.polygon = [];

      for (let elem of this.location.shape.additionalPoints)
        this.polygon.push({ lat: Number(elem.lat), lng: Number(elem.lng) });

      this.center = this.polygon[0];

      this.initDrawingManager(map);
    })
  }

  initDrawingManager(map: any) {
    let options = {
      drawingControl: true,
      drawingControlOptions: {
        drawingModes: ["polygon"]
      },
      drawingMode: google.maps.drawing.OverlayType.POLYGON
    };

    const drawingManager = new google.maps.drawing.DrawingManager(options);
    drawingManager.setMap(null);

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

}
