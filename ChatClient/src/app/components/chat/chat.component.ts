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
  friends: User[];
  chatMessage: string;

  constructor(groupChat: GroupChatService, rest: RestService) {
    this.groupChat = groupChat;
    this.rest = rest;
  }

  ngOnInit() {
    this.group = this.groupChat.getGroup();
    this.rest.getFriends().subscribe(data => {
      this.friends = data;
    });
  }

  isCurrentUser(message: Message) {
    if (message.creator == "5a66f0bf065fee2bf5855ea1") {
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
      let m = new Message("asdfa", "5a66f0bf065fee2bf5855ea1", this.chatMessage, Date.now().toLocaleString());
      this.group.messages.push(m);
      this.group.messages.push(m);
      this.group.messages.pop();
      this.chatMessage = null;
    }
    console.log(this.group);
  }

}
