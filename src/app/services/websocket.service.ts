import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  private socket: WebSocket;
  private messagesSubject: Subject<any> = new Subject<any>();

  constructor() {
    this.socket = new WebSocket('wss://your-websocket-server-url');
    this.socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      this.messagesSubject.next(message);
    };
    this.socket.onerror = (error) => {
      console.error('WebSocket error: ', error);
    };
    this.socket.onclose = () => {
      console.log('WebSocket connection closed');
    };
  }

  get messages$(): Observable<any> {
    return this.messagesSubject.asObservable();
  }

  sendMessage(message: any): void {
    this.socket.send(JSON.stringify(message));
  }

  closeConnection(): void {
    this.socket.close();
  }
}
