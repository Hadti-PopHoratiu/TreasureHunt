import { UsersService } from './../../services/users.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: any;

  constructor(private User: UsersService) { }

  ngOnInit() {
    this.User.getUsers().subscribe(data =>{
      this.users = data;
    })
  }

}
