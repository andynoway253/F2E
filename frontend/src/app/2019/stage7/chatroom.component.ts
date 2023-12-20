import {
  Component,
  OnInit,
  ViewChildren,
  QueryList,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ChatService } from './chatroom.service';

@Component({
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.scss'],
})
export class ChatroomComponent implements OnInit {
  constructor(private chatService: ChatService) {}

  @ViewChildren('message') message: QueryList<any>;

  @ViewChild('content') content: ElementRef;

  destory$ = new Subject();

  nickName = '';

  sendMsg = '';

  messages: string[] = [];

  online: number;

  ngOnInit(): void {
    this.chatService
      .getUser()
      .pipe(takeUntil(this.destory$))
      .subscribe({
        next: (data: number) => {
          this.online = data
        },
      });

    this.chatService
      .getMessages()
      .pipe(takeUntil(this.destory$))
      .subscribe({
        next: (data: { user: string; text: string }) => {
          this.messages.push(data.text);
        },
      });
  }

  ngOnDestroy(): void {
    this.destory$.next(true);
    this.destory$.complete();
  }

  ngAfterViewInit() {
    this.message.changes.pipe(takeUntil(this.destory$)).subscribe({
      next: () => {
        this.scrollToBottom();
      },
    });
  }

  sendMessage() {
    if (!this.sendMsg) {
      return;
    }

    this.chatService.sendMessage(this.sendMsg);
    this.sendMsg = '';
  }

  scrollToBottom() {
    this.content.nativeElement.scrollTo({
      top: this.content.nativeElement.scrollHeight,
      behavior: 'smooth',
    });
  }

  cofirm() {}
}
