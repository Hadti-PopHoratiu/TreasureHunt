import { UsersService } from './../../services/users.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  constructor(private User: UsersService, private route : ActivatedRoute) { }
  userDetails: any;
  id: any;

  ngOnInit() {
    this.route.params.subscribe(params =>{
      this.id = params['id'];
      console.log(this.id);
      this.User.getUserId(this.id).subscribe(data =>{
        this.userDetails = data;
        console.log(this.userDetails);
      })
    })

  }

}
