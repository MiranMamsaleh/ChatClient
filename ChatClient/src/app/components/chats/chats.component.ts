import { Message } from './../../models/message';
import { TokenService } from './../../services/token.service';
import { WebSocketService } from './../../services/web-socket.service';
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
  friends = new Array<User>();
  groups = new Array<Group>();
  router: Router;
  wsService: WebSocketService;
  id: string;
  tokenService: TokenService;

  constructor(rest: RestService, router: Router, groupchat: GroupChatService, wsService: WebSocketService, tokenservice: TokenService) {
    this.rest = rest;
    this.router = router;
    this.groupchat = groupchat;
    this.wsService = wsService;
    this.tokenService = tokenservice;
  }

  ngOnInit() {
    this.wsService.loadChats();
    this.wsService.loadFriends();
    this.wsService.loadUserData();
    this.wsService.getFriends().subscribe(data => {
      console.log(data);
      this.friends = data;
    });
    this.wsService.getUserData().subscribe(data => {
      this.id = data;
    });
    this.wsService.getChats().subscribe(data => {
      this.groups.push(data);
    });
    this.wsService.getMessage().subscribe(data => {
      this.groups.forEach(element => {
        debugger;
        if (element._id == data.room) {
          element.messages.push(data);
        }
      });
    });
    this.groups.forEach(element => {
      element.messages.sort((a, b) => (Date.parse(a.timestamp) - Date.parse(b.timestamp)));
    });
  }

  getDate(messages: Message[]): String {
    let text = messages[messages.length - 1].timestamp;
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

  getMessage(messages: Message[]): String {
    let text = messages[messages.length - 1].message;
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
    this.groupchat.setFriends(this.friends);
    this.groupchat.setId(this.id);
    this.router.navigate(['Chat']);
  }

  redirectToFriends() {
    this.router.navigate(['Friends']);
  }

  createNewGroup() {

  }

  logout() {
    this.tokenService.deleteToken();
    this.router.navigate(['Login']);
  }
}
