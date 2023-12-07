import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io } from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private apiUrl = 'https://f2e.onrender.com'; // 你的Node.js服务器地址

  // private apiUrl = 'http://localhost:3000'; // 你的Node.js服务器地址
  private socket = io(this.apiUrl, { withCredentials: true });

  sendMessage(message: string) {
    this.socket.emit('add-message', message);
  }

  getMessages(): Observable<{ user: string; text: string }> {
    return new Observable((obs) => {
      this.socket.on('message', (data: any) => {
        obs.next(data);
      });

      return () => {
        this.socket.disconnect();
      };
    });
  }

  getUser(): Observable<any> {
    return new Observable((obs) => {
      this.socket.on('connectedUsersCount', (data: any) => {
        obs.next(data);
      });

      return () => {
        this.socket.disconnect();
      };
    });
  }
}
