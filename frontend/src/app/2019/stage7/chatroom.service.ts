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

  sendMessage(message: { userName: string; text: string }) {
    this.socket.emit('sendMessage', message);
  }

  getMessages(): Observable<{ type: string; text: string }> {
    return new Observable((obs) => {
      this.socket.on('message', (data: any) => {
        obs.next(data);
      });
    });
  }

  getOnlineUser(): Observable<number> {
    return new Observable((obs) => {
      this.socket.on('connectedUsersCount', (data: number) => {
        obs.next(data);
      });
    });
  }

  checkConnectStatus() {
    if (!this.socket.connected) {
      this.socket.connect();
    }
  }

  joinChatRoom(nickName: string): Observable<boolean> {
    this.socket.emit('login', { userName: nickName });

    return new Observable((obs) => {
      this.socket.on('loginSuccess', () => {
        obs.next(true);
      });

      this.socket.on('loginFail', () => {
        obs.next(false);
      });
    });
  }

  liveChatRoom() {
    this.socket.emit('logout');

    this.socket.disconnect();
  }
}
