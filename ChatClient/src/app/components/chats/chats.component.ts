import { GroupChatService } from './../../services/group-chat.service';
import { User } from './../../models/user';
import { RestService } from './../../services/rest.service';
import { Component, OnInit } from '@angular/core';
import { Group } from '../../models/group';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.scss']
})
export class ChatsComponent implements OnInit {
  searchString: string = "";
  rest: RestService;
  groupchat: GroupChatService;
  friends: User[];
  groups: Group[];
  router: Router;

  constructor(rest: RestService, router: Router, groupchat: GroupChatService) {
    this.rest = rest;
    this.router = router;
    this.groupchat = groupchat;
  }

  ngOnInit() {
    this.rest.getFriends().subscribe(data => {
      this.friends = data;
    });
    this.rest.getGroups().subscribe(data => {
      this.groups = data;
    })
    this.groups.forEach(element => {
      element.messages.sort((a, b) => (Date.parse(a.timestamp) - Date.parse(b.timestamp)));
    });
  }

  getDate(text: string): String {
    let date = new Date(text);
    let datenow = new Date();
    date.setHours(0, 0, 0, 0); //ignore time part
    datenow.setHours(0, 0, 0, 0); //ignore time part
    let dayDiff = datenow.getTime() - date.getTime();
    dayDiff = dayDiff / 86400000;
    return dayDiff.toString() + " days ago";
  }

  getMessage(text: string): String {
    this.friends.forEach(element => {
      text = text.replace(element._id, element.username);
    });
    return text;
  }

  matchesFilter(group: Group) {
    return (group.groupName.toUpperCase().indexOf(this.searchString.toUpperCase()) == 0);
  }

  redirectToChat(group: Group) {
    this.groupchat.setGroup(group);
    this.router.navigate(['Chat']);
  }

  redirectToFriends() {
    this.router.navigate(['Friends']);
  }
}
