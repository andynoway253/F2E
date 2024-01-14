import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io } from 'socket.io-client';
import { user } from './model/user.model';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  // private apiUrl = 'https://f2e.onrender.com'; // 你的Node.js服务器地址

  private apiUrl = 'http://localhost:3000/public'; // 你的Node.js服务器地址
  private socket = io(this.apiUrl, { withCredentials: true });

  sendMessage(message: {
    receiverId: string;
    userId: string;
    userName: string;
    userConnect: string[];
    text: string;
  }) {
    this.socket.emit('sendMessage', message);
  }

  getMessages(): Observable<{ type: string; text: string; userName: string }> {
    return new Observable((obs) => {
      this.socket.on('message', (data: any) => {
        obs.next(data);
      });
    });
  }

  getOnlineInfo(): Observable<{
    userCount: number;
    userList: Array<{ userId: string; userName: string }>;
  }> {
    return new Observable((obs) => {
      this.socket.on(
        'getOnlineInfo',
        (data: {
          userCount: number;
          userList: Array<{ userId: string; userName: string }>;
        }) => {
          obs.next(data);
        }
      );
    });
  }

  getResponseForPrivateMessage(): Observable<{
    receiverId: string;
  }> {
    return new Observable((obs) => {
      this.socket.on(
        'getResponseForPrivateMessage',
        (data: { receiverId: string }) => {
          obs.next(data);
        }
      );
    });
  }
  getNotify(): Observable<{
    receiverId: string;
    userId: string;
    userName: string;
    text: string;
  }> {
    return new Observable((obs) => {
      this.socket.on(
        'getNotify',
        (data: {
          receiverId: string;
          userId: string;
          userName: string;
          text: string;
        }) => {
          obs.next(data);
        }
      );
    });
  }

  acceptPrivateMessage(bothId: { userId: string; receiverId: string }) {
    this.socket.emit('acceptPrivateMessage', bothId);
  }

  joinLobby(nickName: string): Observable<boolean> {
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

  checkConnectStatus() {
    if (!this.socket.connected) {
      this.socket.connect();
    }
  }

  liveLobby() {
    this.socket.emit('logout');

    this.socket.disconnect();
  }

  // createRoom(roomId: { id: string }) {
  //   this.publicSocket.emit('createRoom', { roomId });
  // }
}
