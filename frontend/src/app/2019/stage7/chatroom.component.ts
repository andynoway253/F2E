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
import { messages, user } from './model/chatroom.model';

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
  @ViewChildren('messageContent') messageContent: QueryList<any>;

  @ViewChild('content') content: ElementRef;

  @ViewChild('inputNameDialog') inputNameDialog: TemplateRef<any>;

  @ViewChild('onlineDialog') onlineDialog: TemplateRef<any>;

  destory$ = new Subject();

  startChat$ = new Subject<boolean>();

  join$ = new BehaviorSubject<boolean>(false);

  inputNameDialogRef: NbDialogRef<any>;

  onlineDialogRef: NbDialogRef<any>;

  user: user;

  messages: messages = { lobby: [] };

  accept: 'accept' | 'reject' | '' = '';

  currectRoomId = 'lobby';

  receiverId = '';

  sendMsg = '';

  roomList: Array<{ roomId: string; roomName: string }> = [
    { roomId: 'lobby', roomName: '大廳' },
  ];

  onlineList: Array<{ userId: string; userName: string }> = [];

  online: number;

  ngOnInit(): void {
    this.user = {
      userId: '',
      userName: '',
      userConnect: [],
    };

    this.initialObservableListener();
  }

  ngOnDestroy(): void {
    this.destory$.next(true);
    this.destory$.complete();

    this.inputNameDialogRef.close();
    this.onlineDialogRef.close();
  }

  ngAfterViewInit() {
    this.inputNameDialogRef = this.dialogService.open(this.inputNameDialog, {
      closeOnBackdropClick: false,
      closeOnEsc: false,
      hasBackdrop: false,
    });

    this.messageContent.changes.pipe(takeUntil(this.destory$)).subscribe({
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
    if (!this.includeRoom(onlineUser.userName)) {
      const roomId = this.user.userId + '@' + onlineUser.userId;

      this.roomList.push({ roomId, roomName: onlineUser.userName });

      //  建立該房間的聊天陣列
      this.messages[roomId] = [];
    }
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

  sendResponseForPrivateMessage(e: { roomId: string }, accept: boolean) {
    console.log(e);
    this.accept = accept ? 'accept' : 'reject';

    if (accept) {
      /* 接受邀請後，「被邀請者」加入房間 */
      this.chatService.joinRoom({
        roomId: e.roomId,
      });
    }

    //  通知「邀請者」結果，接受或拒絕
    this.chatService.sendResponseForPrivateMessage({
      roomId: e.roomId,
      accept,
    });
  }

  openOnlineListDialog() {
    this.onlineDialogRef = this.dialogService.open(this.onlineDialog);
  }

  closeOnlineListDialog() {
    this.onlineDialogRef.close();
  }

  //  滾動到最下方
  private scrollToBottom() {
    this.content.nativeElement.scrollTo({
      top: this.content.nativeElement.scrollHeight,
      behavior: 'smooth',
    });
  }

  private initialObservableListener() {
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
        next: (res: {
          roomId: string;
          type: string;
          text: string;
          userName: string;
        }) => {
          console.log(res);
          //  「被邀請者」收到invite後，頁籤上會直接多出「邀請者」姓名的頁籤
          if (!this.includeRoom(res.userName) && res.type === 'invite') {
            this.roomList.push({ roomId: res.roomId, roomName: res.userName });

            this.messages[res.roomId] = [];
          }

          this.messages[res.roomId].push(res);
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
          return this.chatService.getResponseForPrivateMessage();
        }),
        takeUntil(this.destory$)
      )
      .subscribe({
        next: (res: { accept: boolean; roomId: string }) => {
          console.log(res);
          if (res.accept) {
            this.chatService.joinRoom({ roomId: res.roomId });
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

  private includeRoom(userName: string) {
    return this.roomList.some((room) => room.roomName === userName);
  }
}
