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
import { user } from './model/user.model';

interface notify {
  receiverId: string;
  userId: string;
  userName: string;
  text: string;
}

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

  receiverId = '';

  sendMsg = '';

  roomList: string[] = ['大廳'];

  onlineList: Array<{ userId: string; userName: string }> = [];

  publicMessages: any[] = [];

  privateMessages: any[] = [];

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
      receiverId: this.receiverId,
      text: this.sendMsg,
    });
    this.sendMsg = '';
  }

  //  私聊
  privateMessage(user: { userId: string; userName: string }) {
    this.roomList.push(user.userName);

    //  後端創建房間，房間名為，自己的id + 對方的id
    // this.chatService.createRoom({ id: this.myselfId + '@' + user.userId });
  }

  startChat() {
    if (!this.user.userName.trim()) {
      return;
    }
    console.log(this.user);
    this.startChat$.next(true);

    this.chatService.checkConnectStatus();
  }

  onChangeTab(e: any) {
    if (e.tabTitle === '大廳') {
      this.receiverId = null;
      return;
    }

    this.receiverId = this.onlineList.filter(
      (item) => item.userName === e.tabTitle
    )[0].userId;
  }

  //  當對方拒絕私聊時，跳出提示訊息
  alertRejectMessage() {}

  //  當有人傳送私聊訊息，彈出確認聊天框
  openNotifyDialog() {
    this.notifyDialogRef = this.dialogService.open(this.notifyDialog);
  }

  acceptPrivateMessage(e: notify) {
    this.roomList.push(e.userName);

    this.notifyDialogRef.close();

    //  被邀請者把邀請者的id記錄下來
    this.user.userConnect.push(e.userId);

    //  通知邀請者記錄被邀請者的id
    this.chatService.acceptPrivateMessage({
      userId: e.userId,
      receiverId: e.receiverId,
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

    startChat$
      .pipe(
        switchMap(() => {
          return this.chatService.getMessages();
        }),
        takeUntil(this.destory$)
      )
      .subscribe({
        next: (data: { type: string; text: string; userName: string }) => {
          this.publicMessages.push(data);
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
        next: (res: { receiverId: string }) => {
          this.user.userConnect.push(res.receiverId);
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
