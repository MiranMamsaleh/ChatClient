import { Router } from '@angular/router';

import { User } from './../../models/user';
import { RestService } from './../../services/rest.service';
import { Component, OnInit } from '@angular/core';
import { Group } from '../../models/group';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss']
})
export class FriendsComponent implements OnInit {
  rest: RestService;
  friends: User[];
  searchString: string = "";
  router: Router;

  constructor(rest: RestService, router: Router) {
    this.rest = rest;
    this.router = router;
  }

  ngOnInit() {
    this.rest.getFriends().subscribe(data => {
      this.friends = data;
    });
  }

  getDate(text: string): String {
    let date = new Date(text);
    let datenow = new Date();
    let diff = datenow.getTime() - date.getTime();
    let dayDiff = Math.floor(diff / 86400000);
    if (dayDiff !== 0) {
      return dayDiff.toString() + " days ago";
    }
    else {
      let hourDiff = Math.floor((diff % 86400000) / 3600000);
      if (hourDiff !== 0) {
        return hourDiff.toString() + " hours ago";
      }
      else {
        let minDiff = Math.round(((diff % 86400000) % 3600000) / 60000);
        if (minDiff !== 0) {
          return minDiff.toString() + " mins ago";
        }
        else {
          return "Just now!"
        }
      }
    }
  }

  matchesFilter(user: User) {
    return (user.username.toUpperCase().indexOf(this.searchString.toUpperCase()) == 0)
  }

  redirectToChats() {
    this.router.navigate(['Chats']);
  }
}
