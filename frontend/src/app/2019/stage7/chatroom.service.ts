import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io } from 'socket.io-client';
import { message } from './model/chatroom.model';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private apiUrl = 'https://f2e.onrender.com'; // 你的Node.js服务器地址

  // private apiUrl = 'http://localhost:3000'; // 你的Node.js服务器地址
  private socket = io(this.apiUrl, { withCredentials: true });

  sendMessage(message: { roomId: string; userId: string; text: string }) {
    this.socket.emit('sendMessage', message);
  }

  getMessages(): Observable<message> {
    return new Observable((obs) => {
      this.socket.on('message', (data: message) => {
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
    accept: boolean;
    roomId: string;
  }> {
    return new Observable((obs) => {
      this.socket.on(
        'getResponseForPrivateMessage',
        (data: { accept: boolean; roomId: string }) => {
          obs.next(data);
        }
      );
    });
  }

  getConnectStatus(): Observable<{
    roomId: string;
    connectStatus: 'connect' | 'inviting' | 'leave';
  }> {
    return new Observable((obs) => {
      this.socket.on(
        'changeConnectStatus',
        (data: {
          roomId: string;
          connectStatus: 'connect' | 'inviting' | 'leave';
        }) => {
          obs.next(data);
        }
      );
    });
  }

  sendResponseForPrivateMessage(params: {
    roomId: string;
    receiverName: string;
    accept: boolean;
  }) {
    this.socket.emit('sendResponseForPrivateMessage', params);
  }

  sendInvitePrivateMessage(params: { roomId: string; receiverName: string }) {
    this.socket.emit('sendInvitePrivateMessage', params);
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

  joinRoom(params: { roomId: string }) {
    this.socket.emit('joinRoom', params);
  }

  leaveRoom(params: { roomId: string; userId?: string }) {
    this.socket.emit('leaveRoom', params);
  }
}
