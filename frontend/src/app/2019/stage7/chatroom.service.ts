import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io } from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private apiUrl = 'https://f2e1111.onrender.com'; // 你的Node.js服务器地址
  private socket: any;

  sendMessage(message: string) {
    this.socket.emit('add-message', message);
  }

  getMessages(): Observable<{ user: string; text: string }> {
    return new Observable((obs) => {
      this.socket = io(this.apiUrl, { withCredentials: true });
      this.socket.on('message', (data: any) => {
        obs.next(data);
      });

      return () => {
        this.socket.disconnect();
      };
    });
  }
}
