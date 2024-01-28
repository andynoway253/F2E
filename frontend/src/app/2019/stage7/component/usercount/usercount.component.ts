import {
  Component,
  OnInit,
  Input,
  SimpleChanges,
  Output,
  EventEmitter,
} from '@angular/core';
import { NbDialogService, NbDialogRef } from '@nebular/theme';
import { OnlineDialogComponent } from '../../dialog/online/online.component';
import { user } from '../../model/chatroom.model';

@Component({
  selector: 'app-usercount',
  templateUrl: './usercount.component.html',
})
export class UsercountComponent implements OnInit {
  constructor(private dialogService: NbDialogService) {}
  @Input() user: user;

  @Input() onlineList: Array<user>;

  @Output() invite = new EventEmitter<user>();

  dialogRef: NbDialogRef<OnlineDialogComponent>;

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes.onlineList.firstChange) {
      this.onlineList = changes.onlineList.currentValue;

      if (this.dialogRef) {
        console.log(changes.onlineList.currentValue);
        this.dialogRef.componentRef.instance.onlineList =
          changes.onlineList.currentValue;
      }
    }
    if (changes.user && !changes.user.firstChange) {
      this.user = changes.user.currentValue;
    }
  }

  openOnlineListDialog() {
    this.dialogRef = this.dialogService.open(OnlineDialogComponent, {
      context: {
        onlineList: this.onlineList,
        user: this.user,
      },
    });

    this.dialogRef.onClose.subscribe({
      next: (res: user | undefined) => {
        if (res) {
          this.invite.emit(res);
        }
      },
    });
  }
}
