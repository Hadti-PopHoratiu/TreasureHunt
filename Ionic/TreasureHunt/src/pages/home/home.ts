import { Storage } from '@ionic/storage';
import { ApiService } from './../../services/api.service';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { MapsAPILoader } from '@agm/core';
import { Geolocation } from '@ionic-native/geolocation';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { PusherProvider } from '../../providers/pusher/pusher';

declare const google;
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage implements OnInit {
  constructor(
    public navCtrl: NavController,
    private loader: MapsAPILoader,
    private platform: Platform,
    private geolocation: Geolocation,
    private localNotifications: LocalNotifications,
    private api: ApiService,
    private storage: Storage,
    private pusher: PusherProvider
  ) {
    
  }
  center = {
    lat: 47.074085,
    lng: 21.905465,
  };
  zoom = 15;
  polygons = [];

  refresh() {
    setTimeout(() => {
      this.geolocation.getCurrentPosition({ maximumAge: 1000, timeout: 5000, enableHighAccuracy: true }).then(async (position) => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        let idToken = await this.storage.get('id_token');
        let accessToken = await this.storage.get('access_token');
        this.api.ping(idToken, accessToken, this.center).subscribe(res => {
          this.refresh();
        },
        err => {
          this.refresh();
        });
      }).catch((error) => {
        this.refresh();
      });
    }, 3000);
  }

  async ngOnInit() {
    this.platform.ready().then(() => {
      if (this.platform.is('cordova')) {
        this.refresh();
      }
    });

    let accessToken = await this.storage.get('access_token');
    const locationChannel = this.pusher.init(accessToken);

    locationChannel.bind('notification', (data) => {
        console.log(data);
        this.localNotifications.schedule({
          text: data.message,
        });
    });

    this.loader.load().then( async () => {
      let idToken = await this.storage.get('id_token');
      console.log(idToken);
      this.api.getLocations(idToken).subscribe(data =>{
        for (let index = 0; index < data.length; index++) {
          let polygon = [];
          for (let elem of data[index].shape.additionalPoints) {
            polygon.push({ lat: Number(elem.lat), lng: Number(elem.lng) });
          }
          this.polygons.push(polygon);
        }
      })
    });
  }
}