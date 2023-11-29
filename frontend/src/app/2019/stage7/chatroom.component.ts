import { ChatService } from './chatroom.service';
import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.scss'],
})
export class ChatroomComponent implements OnInit {
  constructor(private chatService: ChatService) {}

  sendMsg: string;

  messages: string[] = [];

  ngOnInit(): void {
    this.chatService.getMessages().subscribe({
      next: (data: { user: string; text: string }) => {
        this.messages.push(data.text);

      },
    });
  }

  sendMessage() {
    this.chatService.sendMessage(this.sendMsg);
    this.sendMsg = '';
  }
}
