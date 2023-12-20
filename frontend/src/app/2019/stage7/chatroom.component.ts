import {
  Component,
  OnInit,
  ViewChildren,
  QueryList,
  ViewChild,
  ElementRef,
  TemplateRef,
} from '@angular/core';
import { NbDialogRef, NbDialogService } from '@nebular/theme';
import { Subject, filter, switchMap, takeUntil } from 'rxjs';
import { ChatService } from './chatroom.service';

@Component({
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.scss'],
})
export class ChatroomComponent implements OnInit {
  constructor(
    private dialogService: NbDialogService,

    private chatService: ChatService
  ) {}

  @ViewChildren('message') message: QueryList<any>;

  @ViewChild('dialog') dialog: TemplateRef<any>;

  @ViewChild('content') content: ElementRef;

  destory$ = new Subject();

  startChat$ = new Subject<boolean>();

  dialogRef: NbDialogRef<any>;

  nickName = '';

  sendMsg = '';

  messages: any[] = [];

  online: number;

  login = false;

  ngOnInit(): void {
    this.chatService.checkConnectStatus();

    this.chatService
      .getOnlineUser()
      .pipe(takeUntil(this.destory$))
      .subscribe({
        next: (data: number) => {
          this.online = data;
        },
      });

    this.chatService
      .getMessages()
      .pipe(takeUntil(this.destory$))
      .subscribe({
        next: (data: { type: string; text: string }) => {
          this.messages.push(data);
        },
      });

    this.startChat$
      .pipe(
        filter((boolean) => boolean),
        switchMap((res) => {
          console.log(res);
          return this.chatService.joinChatRoom(this.nickName);
        })
      )
      .subscribe({
        next: (res) => {
          if (res) {
            this.dialogRef.close();

            this.login = res;
          } else {
            alert('名稱重複');
          }
        },
      });

    this.destory$.subscribe({
      next: () => {
        this.chatService.liveChatRoom();
      },
    });
  }

  ngOnDestroy(): void {
    this.destory$.next(true);
    this.destory$.complete();

    this.dialogRef.close();
  }

  ngAfterViewInit() {
    this.dialogRef = this.dialogService.open(this.dialog, {
      closeOnBackdropClick: false,
      closeOnEsc: false,
      hasBackdrop: false,
    });

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

    this.chatService.sendMessage({
      userName: this.nickName,
      text: this.sendMsg,
    });
    this.sendMsg = '';
  }

  scrollToBottom() {
    this.content.nativeElement.scrollTo({
      top: this.content.nativeElement.scrollHeight,
      behavior: 'smooth',
    });
  }

  startChat() {
    if (!this.nickName.trim()) {
      return;
    }

    this.startChat$.next(true);
  }
}
