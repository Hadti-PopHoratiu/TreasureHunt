import { LocationsComponent } from './pages/locations/locations.component';
import { UsersComponent } from './pages/users/users.component';
import { ProfileComponent } from './profile/profile.component';
import { CallbackComponent } from './callback/callback.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HomeComponent } from './pages/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorService } from './services/interceptor.service';
import { AuthGuard } from './auth.guard';
import { UserDetailsComponent } from './pages/user-details/user-details.component';
import { CreateLocationComponent } from './pages/create-location/create-location.component';
import { ExternalApiComponent } from './external-api/external-api.component';
import { LocationDetailsComponent } from './pages/location-details/location-details.component';


const routes: Routes = [
  { path: '', component:  HomeComponent },
  { path: 'callback', component:  CallbackComponent },
  { path: 'profile', component:  ProfileComponent, canActivate: [AuthGuard] },
  { path: 'external-api', component: ExternalApiComponent, canActivate: [AuthGuard] },
  { path: 'dashboard', component:  DashboardComponent, canActivate: [AuthGuard] },
  { path: 'users', component:  UsersComponent, canActivate: [AuthGuard] },
  { path: 'user/:id', component:  UserDetailsComponent, canActivate: [AuthGuard] },
  { path: 'locations', component:  LocationsComponent, canActivate: [AuthGuard] },
  { path: 'add_location', component:  CreateLocationComponent, canActivate: [AuthGuard] },
  { path: 'location_details/:id', component:  LocationDetailsComponent, canActivate: [AuthGuard] },
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    }
  ]
})
export class AppRoutingModule { }
