import { Observable, Subject } from 'rxjs/RX';
import { WebSocketService } from './web-socket.service';
import { Injectable } from '@angular/core';


@Injectable()
export class ChatService {

  message: Subject<any>
  constructor(private webSocketService: WebSocketService) {
    this.message = <Subject<any>>webSocketService
      .connect()
      .map((response: any): any => {
        return response;
      })

  }

  sendMsg(msg) {
    this.message.next(msg);
  }

}
