import { Component, Input, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { user } from '../../model/chatroom.model';

@Component({
  templateUrl: './online.component.html',
  styleUrls: ['./online.component.scss'],
})
export class OnlineDialogComponent implements OnInit {
  constructor(private dialogRef: NbDialogRef<OnlineDialogComponent>) {}

  @Input() onlineList: Array<user>;

  @Input() user: user;

  ngOnInit(): void {}

  invitePrivateMessage(onlineUser: user) {
    this.dialogRef.close(onlineUser);
  }

  closeOnlineListDialog() {
    this.dialogRef.close();
  }
}
