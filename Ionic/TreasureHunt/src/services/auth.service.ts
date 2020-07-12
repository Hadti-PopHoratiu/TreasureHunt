import { HomePage } from './../pages/home/home';
import { ApiService } from './api.service';
import { LoginPage } from './../pages/login/login';
import { App } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { AUTH_CONFIG } from './auth.config';
import Auth0Cordova from '@auth0/cordova';
import * as auth0 from 'auth0-js';

@Injectable()
export class AuthService {
  Auth0 = new auth0.WebAuth(AUTH_CONFIG);
  Client = new Auth0Cordova(AUTH_CONFIG);
  accessToken: string;
  idToken: string;
  user: any;
  loggedIn: boolean;
  loading = true;

  constructor(
    private storage: Storage,
    public app: App,
    public api: ApiService
  ) {
    this.storage.get('profile').then(user => this.user = user);
    this.storage.get('access_token').then(token => this.accessToken = token);
    this.storage.get('id_token').then(token => this.idToken = token);
    this.storage.get('expires_at').then(exp => {
      this.loggedIn = Date.now() < JSON.parse(exp);
      this.loading = false;
    });
  }

  login() {
    this.loading = true;
    const options = {
      scope: 'openid profile email offline_access'
    };

    // Authorize login request with Auth0: open login page and get auth results
    this.Client.authorize(options, (err, authResult) => {
      if (err) {
        throw err;
      }

      this.Auth0.client.userInfo(authResult.accessToken, (err, profile) => {
        if (err) {
          throw err;
        }
          this.api.userVerify(Object.assign(profile, { user_role: 2 }), authResult.idToken).subscribe(
            res => {
              // Set Access Token
              this.storage.set('access_token', authResult.accessToken);
              this.storage.set('id_token', authResult.idToken);
              this.accessToken = authResult.accessToken;
              this.idToken = authResult.idToken;
              // Set Access Token expiration
              const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
              this.storage.set('expires_at', expiresAt);
              // Set logged in
              this.loading = false;
              this.loggedIn = true;

              this.app.getRootNav().setRoot(HomePage);
            },
            (error: any) => {
              console.log(error);
              this.app.getRootNav().setRoot(LoginPage);
            }
          );
      });
    });
  }

  logout() {
    this.storage.remove('profile');
    this.storage.remove('access_token');
    this.storage.remove('id_token');
    this.storage.remove('expires_at');
    this.accessToken = null;
    this.idToken = null;
    this.user = null;
    this.loggedIn = false;
    this.app.getRootNav().setRoot(LoginPage);
  }
}