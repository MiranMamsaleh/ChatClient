import { Group } from './../models/group';
import { Injectable } from '@angular/core';

@Injectable()
export class GroupChatService {

  group: Group;

  constructor() { }

  setGroup(group: Group) {
    this.group = group;
  }

  getGroup() {
    return this.group;
  }
}
