import { User } from './../models/user';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class RestService {

  private http;

  constructor(http: HttpClient) {
    this.http = http;
  }

  getFriends() {
    return this.http.get("./app/data/testData.json");
  }

  getGroups() {
    return this.http.get("./app/data/chatData.json")
  }
}
