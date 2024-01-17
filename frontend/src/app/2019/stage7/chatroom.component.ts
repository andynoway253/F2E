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
import { BehaviorSubject, Subject, filter, switchMap, takeUntil } from 'rxjs';
import { ChatService } from './chatroom.service';
import { notify, user } from './model/chatroom.model';

@Component({
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.scss'],
})
export class ChatroomComponent implements OnInit {
  constructor(
    private dialogService: NbDialogService,

    private chatService: ChatService
  ) {}

  //  做滾動用
  @ViewChildren('publicContent') publicContent: QueryList<any>;

  @ViewChild('content') content: ElementRef;

  @ViewChild('inputNameDialog') inputNameDialog: TemplateRef<any>;

  @ViewChild('onlineDialog') onlineDialog: TemplateRef<any>;

  @ViewChild('notifyDialog') notifyDialog: TemplateRef<any>;

  destory$ = new Subject();

  startChat$ = new Subject<boolean>();

  join$ = new BehaviorSubject<boolean>(false);

  inputNameDialogRef: NbDialogRef<any>;

  onlineDialogRef: NbDialogRef<any>;

  notifyDialogRef: NbDialogRef<any>;

  notify: notify;

  user: user;

  currectRoomId = 'lobby';

  receiverId = '';

  sendMsg = '';

  roomList: Array<{ roomId: string; roomName: string }> = [
    { roomId: 'lobby', roomName: '大廳' },
  ];

  onlineList: Array<{ userId: string; userName: string }> = [];

  messages: {
    [key: string]: Array<{
      type: string;
      text: string;
      userName: string;
    }>;
  } = { lobby: [] };

  online: number;

  ngOnInit(): void {
    this.user = {
      userId: '',
      userName: '',
    };

    this.initialObservableListener();
  }

  ngOnDestroy(): void {
    this.destory$.next(true);
    this.destory$.complete();

    this.inputNameDialogRef.close();
  }

  ngAfterViewInit() {
    this.inputNameDialogRef = this.dialogService.open(this.inputNameDialog, {
      closeOnBackdropClick: false,
      closeOnEsc: false,
      hasBackdrop: false,
    });

    this.publicContent.changes.pipe(takeUntil(this.destory$)).subscribe({
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
      ...this.user,
      roomId: this.currectRoomId,
      receiverId: this.receiverId,
      text: this.sendMsg,
    });
    this.sendMsg = '';
  }

  //  發送私聊邀請
  invitePrivateMessage(onlineUser: { userId: string; userName: string }) {
    const roomId = this.user.userId + '@' + onlineUser.userId;

    this.roomList.push({ roomId, roomName: onlineUser.userName });
  }

  startChat() {
    if (!this.user.userName.trim()) {
      return;
    }

    this.startChat$.next(true);

    this.chatService.checkConnectStatus();
  }

  onChangeTab(e: any) {
    if (e.tabTitle === '大廳') {
      this.receiverId = null;

      this.currectRoomId = 'lobby';
      return;
    }

    this.receiverId = this.onlineList.filter(
      (item) => item.userName === e.tabTitle
    )[0].userId;

    this.currectRoomId = this.roomList.filter(
      (room) => room.roomName === e.tabTitle
    )[0].roomId;
  }

  //  當對方拒絕私聊時，跳出提示訊息
  alertRejectMessage() {}

  //  當有人傳送私聊訊息，彈出確認聊天框
  openNotifyDialog() {
    this.notifyDialogRef = this.dialogService.open(this.notifyDialog);
  }

  acceptPrivateMessage(e: notify) {
    this.notifyDialogRef.close();

    const roomId = e.userId + '@' + e.receiverId;

    this.roomList.push({ roomId, roomName: e.userName });

    this.messages[roomId] = [];

    /* 接受邀請後，被邀請者加入房間 */
    this.chatService.joinRoom({
      roomId,
    });

    //  通知邀請者加入房間
    this.chatService.acceptPrivateMessage({
      roomId,
    });
  }

  rejectPrivateMessage(e: notify) {
    this.notifyDialogRef.close();

    //  拒絕事件
  }

  openOnlineListDialog() {
    this.onlineDialogRef = this.dialogService.open(this.onlineDialog);
  }

  closeOnlineListDialog() {
    this.onlineDialogRef.close();
  }

  //  滾動到最下方
  scrollToBottom() {
    this.content.nativeElement.scrollTo({
      top: this.content.nativeElement.scrollHeight,
      behavior: 'smooth',
    });
  }

  initialObservableListener() {
    const startChat$ = this.startChat$.pipe(filter((boolean) => boolean));

    //  取得線上人數及線上清單
    startChat$
      .pipe(
        switchMap(() => {
          return this.chatService.getOnlineInfo();
        }),
        takeUntil(this.destory$)
      )
      .subscribe({
        next: (data: {
          userCount: number;
          userList: Array<{ userId: string; userName: string }>;
        }) => {
          this.online = data.userCount;

          this.onlineList = data.userList;

          this.user.userId = data.userList.filter(
            (item) => item.userName === this.user.userName
          )[0].userId;
        },
      });

    //  取得通知和聊天訊息
    startChat$
      .pipe(
        switchMap(() => {
          return this.chatService.getMessages();
        }),
        takeUntil(this.destory$)
      )
      .subscribe({
        next: (data: { type: string; text: string; userName: string }) => {
          this.messages[this.currectRoomId].push(data);
        },
      });

    startChat$
      .pipe(
        switchMap(() => {
          return this.chatService.joinLobby(this.user.userName);
        }),
        takeUntil(this.destory$)
      )
      .subscribe({
        next: (res: boolean) => {
          if (res) {
            this.join$.next(res);

            this.inputNameDialogRef.close();
          } else {
            alert('名稱重複');
          }
        },
      });

    startChat$
      .pipe(
        switchMap(() => {
          return this.chatService.getNotify();
        }),
        takeUntil(this.destory$)
      )
      .subscribe({
        next: (res: {
          receiverId: string;
          userId: string;
          userName: string;
          text: string;
        }) => {
          this.notify = res;

          this.openNotifyDialog();
        },
      });

    startChat$
      .pipe(
        switchMap(() => {
          return this.chatService.getResponseForPrivateMessage();
        }),
        takeUntil(this.destory$)
      )
      .subscribe({
        next: (res: { accept: boolean; roomId?: string }) => {
          if (res.accept) {
            this.chatService.joinRoom({ roomId: res.roomId });

            this.messages[res.roomId] = [];
          }
        },
      });

    //  切換左側項目時會執行destory
    this.destory$.subscribe({
      next: () => {
        this.chatService.liveLobby();
      },
    });
  }
}
