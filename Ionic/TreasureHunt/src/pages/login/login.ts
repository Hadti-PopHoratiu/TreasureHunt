import { TabsPage } from './../tabs/tabs';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage implements OnInit{

  constructor(public navCtrl: NavController, public navParams: NavParams, public auth: AuthService, public storage: Storage) {
  }
  async ngOnInit(){
    let token = await this.storage.get('access_token');
    if ( token != null) {
      this.navCtrl.setRoot(TabsPage);
    }
  }
}
