import { element } from 'protractor';
import { WebSocketService } from './../../services/web-socket.service';
import { Message } from './../../models/message';
import { GroupChatService } from './../../services/group-chat.service';
import { User } from './../../models/user';
import { RestService } from './../../services/rest.service';
import { Component, OnInit } from '@angular/core';
import { Group } from '../../models/group';
import { group } from '@angular/core/src/animation/dsl';



@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  groupChat: GroupChatService;
  group: Group = new Group();
  rest: RestService;
  friends = new Array<User>();
  chatMessage: string;
  wsService: WebSocketService;
  userId: string;

  constructor(groupChat: GroupChatService, rest: RestService, wsService: WebSocketService) {
    this.groupChat = groupChat;
    this.rest = rest;
    this.wsService = wsService;
  }

  ngOnInit() {
    this.group = this.groupChat.getGroup();
    console.log(this.group);
    this.friends = this.groupChat.getFriends();
    console.log(this.friends);
    this.userId = this.groupChat.getId();
    console.log(this.userId);
    this.wsService.getMessage().subscribe(data => {
      console.log(data);
      if (this.group._id == data.room) {
        this.group.messages.push(data);
      }
    });

  }

  isCurrentUser(message: Message) {
    if (message.creator == this.userId) {
      return true;
    }
    return false;
  }
  getMessage(text: string): String {
    this.friends.forEach(element => {
      text = text.replace(element._id, element.username);
    });
    return text;
  }
  getDate(text: string) {
    let date = new Date(text);
    return date.getHours() + ":" + date.getMinutes() + ", " + date.getDate() + "." + (date.getMonth() + 1);
  }

  sendMessage() {
    if (this.chatMessage != null) {
      this.wsService.sendMessage(this.chatMessage, this.group._id);
      this.chatMessage == "";
    }
    window.scrollTo(0, document.querySelector(".MyChat").scrollHeight);
  }

  getName(message: Message) {
    let name = "";
    this.friends.forEach(element => {
      if (element._id == message.creator) {
        name = element.username;
      }
    });
    return name;
  }

}
