import { User } from './../models/user';
import { Group } from './../models/group';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs/Observable'
import * as Rx from 'rxjs/Rx'
import { TokenService } from './token.service';
import { Message } from '../models/message';

@Injectable()
export class WebSocketService {

  private socket;

  constructor(public tokenService: TokenService) { }

  connect(): Rx.Subject<MessageEvent> {
    console.log("Fetta huso")
    this.socket = io('https://peaceful-ridge-95928.herokuapp.com' + "?token=" + this.tokenService.getToken());
    let observable = new Observable(observer => {
      this.socket.on('message', (data) => {
        console.log("Received a message");
        observer.next(data);
      })
      return () => {
        this.socket.disconnect();
      }
    })

    let observer = {
      next: (data: Object) => {
        this.socket.emit('message', JSON.stringify(data));
      },
    };

    return Rx.Subject.create(observer, observable);
  }

  getChats(): Observable<Group> {
    return new Observable<Group>(observer => {
      this.socket.on('getChats', (data) => {
        console.log("hello");
        observer.next(data);
      });
    });
  }

  getFriends(): Observable<Array<User>> {
    return new Observable<Array<User>>(observer => {
      this.socket.on('getFriends', (data) => {
        console.log("hello");
        observer.next(data);
      });
    });
  }

  getUserData(): Observable<string> {
    return new Observable<string>(observer => {
      this.socket.on('getUserData', (data) => {
        console.log(data);
        observer.next(data);
      });
    });
  }

  sendMessage(message: string, id: string): void {
    this.socket.emit('message', {
      message: message,
      room: id
    });
  }

  getMessage() {
    return new Observable<Message>(observer => {
      this.socket.on('message', (data) => {
        console.log("adfdasfx");
        observer.next(data);
      });
    });
  }

  loadChats() {
    this.socket.emit('getChats');
  }

  loadFriends() {
    this.socket.emit('getFriends');
  }

  loadUserData() {
    this.socket.emit('getUserData');
  }



}
