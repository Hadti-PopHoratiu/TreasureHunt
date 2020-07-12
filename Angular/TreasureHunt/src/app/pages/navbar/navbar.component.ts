import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  navbarOpen = false;

  constructor(public auth: AuthService) {}

  async ngOnInit() {
    this.auth.localAuthSetup();
  }

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }
}