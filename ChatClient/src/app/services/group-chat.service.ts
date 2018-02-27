import { User } from './../models/user';
import { Group } from './../models/group';
import { Injectable } from '@angular/core';

@Injectable()
export class GroupChatService {

  group: Group;
  friends = new Array<User>();
  id = '';

  constructor() { }

  setGroup(group: Group) {
    this.group = group;
  }

  getGroup() {
    return this.group;
  }

  setFriends(friends: User[]) {
    this.friends = friends;
  }

  getFriends() {
    return this.friends;
  }

  setId(id: string) {
    this.id = id;
  }
  getId() {
    return this.id;
  }
}
