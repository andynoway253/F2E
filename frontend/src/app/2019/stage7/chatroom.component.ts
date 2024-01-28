import {
  Component,
  OnInit,
  ViewChildren,
  QueryList,
  ElementRef,
  ViewChild,
  TemplateRef,
} from '@angular/core';
import {
  NbDialogService,
  NbToastrService,
  NbTabsetComponent,
  NbDialogRef,
  NbGlobalPhysicalPosition,
  NbTabComponent,
} from '@nebular/theme';
import {
  Subject,
  BehaviorSubject,
  takeUntil,
  tap,
  switchMap,
  filter,
} from 'rxjs';
import { ChatService } from './chatroom.service';
import { InputNameService } from './dialog/inputName/inputName.service';
import { user, messages } from './model/chatroom.model';

@Component({
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.scss'],
})
export class ChatroomComponent implements OnInit {
  constructor(
    private dialogService: NbDialogService,

    private toastrService: NbToastrService,

    private chatService: ChatService,

    private inputNameService: InputNameService
  ) {}

  //  做滾動用
  @ViewChildren('messageContent') messageContent: QueryList<any>;

  @ViewChildren('content') content: QueryList<ElementRef>;

  @ViewChildren('tabset') tabsetEl: QueryList<NbTabsetComponent>;

  @ViewChildren('tab') tab: QueryList<NbTabsetComponent>;

  @ViewChild('leaveConfrimDialog') leaveConfrimDialog: TemplateRef<any>;

  destory$ = new Subject();

  join$ = new BehaviorSubject<boolean>(false);

  private changeTab$ = new BehaviorSubject<boolean>(false);

  private leaveConfrimDialogRef: NbDialogRef<any>;

  private currectTabIndex = 0;

  currectRoomId = 'lobby';

  sendMsg = '';

  showLeaveBtn = false;

  onlineList: Array<user> = [];

  user: user;

  messages: messages = { lobby: [] };

  roomList: Array<{
    roomId: string;
    roomName: string;
    connectStatus: 'connect' | 'invite' | 'leave' | '';
  }> = [{ roomId: 'lobby', roomName: '大廳', connectStatus: 'connect' }];

  ngOnInit(): void {
    this.user = {
      userId: '',
      userName: '',
    };

    this.initialObservableListener();
  }

  ngAfterViewInit() {
    this.messageContent.changes.pipe(takeUntil(this.destory$)).subscribe({
      next: () => {
        this.scrollToBottom();
      },
    });
  }

  ngOnDestroy(): void {
    this.destory$.next(true);

    this.destory$.complete();

    this.inputNameService.close();
  }

  sendMessage() {
    if (!this.sendMsg) {
      return;
    }

    const room = this.roomList.filter(
      (room) => room.roomId === this.currectRoomId
    )[0];

    const physicalPositions = NbGlobalPhysicalPosition;

    if (room.connectStatus === 'invite') {
      if (this.user.userId === room.roomId.split('@')[0]) {
        this.toastrService.show('等待對方回應', '請稍等', {
          position: physicalPositions.TOP_RIGHT,
          status: 'warning',
        });
      }

      if (this.user.userId === room.roomId.split('@')[1]) {
        this.toastrService.show('請先接受或拒絕對方邀請', '請稍等', {
          position: physicalPositions.TOP_RIGHT,
          status: 'warning',
        });
      }
      return;
    } else if (room.connectStatus === 'leave') {
      this.toastrService.show(
        '對方已離開，按右下離開可以關閉頁籤',
        '(〒︿〒)',
        {
          position: physicalPositions.TOP_RIGHT,
          status: 'danger',
        }
      );

      return;
    }

    this.chatService.sendMessage({
      ...this.user,
      roomId: this.currectRoomId,
      text: this.sendMsg,
    });
    this.sendMsg = '';
  }

  //  離開私聊
  leaveRoom() {
    this.leaveConfrimDialogRef.close(true);
  }

  //  不離開私聊
  stay() {
    this.leaveConfrimDialogRef.close(false);
  }

  //  離開私聊前的確認
  checkLeaveRoom() {
    const test = this.roomList[this.currectTabIndex];

    if (['invite', 'connect'].includes(test.connectStatus)) {
      this.leaveConfrimDialogRef = this.dialogService.open(
        this.leaveConfrimDialog
      );

      this.leaveConfrimDialogRef.onClose.subscribe({
        next: (res: boolean) => {
          if (res) {
            this.chatService.liveRoom();

            this.deleteRoomList(this.currectTabIndex);
          }
        },
      });
    }
  }

  //  發送私聊邀請
  invitePrivateMessage(onlineUser: { userId: string; userName: string }) {
    const { userId, userName } = onlineUser;
    if (!this.includeRoom(userName)) {
      const roomId = this.user.userId + '@' + userId;

      this.roomList.push({
        roomId,
        roomName: userName,
        connectStatus: 'invite',
      });

      this.chatService.sendInvitePrivateMessage({
        roomId,
        receiverName: userName,
      });

      // this.closeOnlineListDialog();

      //  建立該房間的聊天陣列
      this.messages[roomId] = [];

      this.changeTab$.next(true);
    }
  }

  onChangeTab(e: NbTabComponent) {
    this.currectTabIndex = this.roomList.findIndex(
      (room) => room.roomName === e.tabTitle
    );

    this.currectRoomId =
      e.tabTitle === '大廳'
        ? 'lobby'
        : this.roomList.filter((room) => room.roomName === e.tabTitle)[0]
            .roomId;

    this.showLeaveBtn = e.tabTitle !== '大廳';
  }

  sendResponseForPrivateMessage(
    e: { roomId: string; accept?: string },
    accept: boolean
  ) {
    e.accept = accept ? 'accept' : 'reject';

    const room = this.roomList.filter((room) => room.roomId === e.roomId)[0];

    if (accept) {
      /* 接受邀請後，「被邀請者」加入房間 */
      this.chatService.joinRoom({
        roomId: e.roomId,
      });

      room.connectStatus = 'connect';
    } else {
      room.connectStatus = '';
    }

    //  通知「邀請者」結果，接受或拒絕。傳 receiverName 是為了告訴 邀請者「是誰」答應或拒絕
    this.chatService.sendResponseForPrivateMessage({
      roomId: e.roomId,
      receiverName: this.user.userName,
      accept,
    });
  }

  private initialObservableListener() {
    const startChat$ = this.inputNameService.open().onClose.pipe(
      tap((userName: string) => {
        this.user.userName = userName;

        this.join$.next(true);

        this.chatService.checkConnectStatus();
      })
    );

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
          //  「被邀請者」收到invite後，頁籤上會直接多出「邀請者」姓名的頁籤
          if (!this.includeRoom(res.userName) && res.type === 'invite') {
            this.roomList.push({
              roomId: res.roomId,
              roomName: res.userName,
              connectStatus: 'invite',
            });

            this.messages[res.roomId] = [];

            this.changeTab$.next(false);
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
          if (!res) {
            const physicalPositions = NbGlobalPhysicalPosition;

            this.toastrService.show('名稱重複', '╮(╯_╰)╭', {
              position: physicalPositions.TOP_RIGHT,
              status: 'danger',
            });
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
          const room = this.roomList.filter(
            (room) => room.roomId === res.roomId
          )[0];

          if (res.accept) {
            room.connectStatus = 'connect';

            this.chatService.joinRoom({ roomId: res.roomId });

            return;
          }

          room.connectStatus = '';
        },
      });

    startChat$
      .pipe(
        switchMap(() => this.tab.changes),
        filter(() => this.changeTab$.getValue())
      )
      .subscribe({
        next: (res: { toArray: () => NbTabComponent[] }) => {
          //  發請私聊請求的人才需要在按下私聊按鈕時切換頁
          setTimeout(() => {
            this.tabsetEl.first.selectTab(
              res.toArray()[res.toArray().length - 1]
            );
          });
        },
      });

    //  切換左側項目時會執行destory
    this.destory$.subscribe({
      next: () => {
        this.chatService.liveLobby();
      },
    });
  }

  //  滾動到最下方
  private scrollToBottom() {
    const nativeElement = this.content.filter(
      (_, index) => index === this.currectTabIndex
    )[0].nativeElement;

    nativeElement.scrollTo({
      top: nativeElement.scrollHeight,
      behavior: 'smooth',
    });
  }

  private includeRoom(userName: string) {
    return this.roomList.some((room) => room.roomName === userName);
  }

  private deleteRoomList(deleteIndex: any) {
    this.roomList.splice(deleteIndex, 1);
  }
}
