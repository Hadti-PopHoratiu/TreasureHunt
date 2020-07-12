import { LocationsService } from './services/locations.service';
import { PusherService } from './services/pusher.service';
import { ApiService } from './services/api.service';
import { UsersService } from './services/users.service';
import { AuthService } from './services/auth.service';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule }   from '@angular/forms';
import { AgmCoreModule } from '@agm/core';

import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HomeComponent } from './pages/home/home.component';
import { NavbarComponent } from './pages/navbar/navbar.component';
import { CallbackComponent } from './callback/callback.component';
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './pages/users/users.component';
import { UserDetailsComponent } from './pages/user-details/user-details.component';
import { CreateLocationComponent } from './pages/create-location/create-location.component';
import { ExternalApiComponent } from './external-api/external-api.component';
import { InterceptorService } from './services/interceptor.service';
import { LocationsComponent } from './pages/locations/locations.component';
import { LocationDetailsComponent } from './pages/location-details/location-details.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DashboardComponent,
    NavbarComponent,
    CallbackComponent,
    ProfileComponent,
    UsersComponent,
    UserDetailsComponent,
    CreateLocationComponent,
    ExternalApiComponent,
    LocationsComponent,
    LocationDetailsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBxEFN6kIMOx-6lxm0ni63LMKzFIaeoyLM',
      libraries: ['geometry', 'drawing'],
    }),
  ],
  providers: [
    AuthService,
    UsersService,
    LocationsService,
    ApiService,
    InterceptorService,
    PusherService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
