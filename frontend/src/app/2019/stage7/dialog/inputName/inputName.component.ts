import { Component, OnInit } from '@angular/core';
import { NbToastrService, NbGlobalPhysicalPosition } from '@nebular/theme';
import { Subject, filter, switchMap } from 'rxjs';
import { ChatService } from '../../chatroom.service';
import { InputNameService } from './inputName.service';

@Component({
  templateUrl: './inputName.component.html',
})
export class InputNameDialogComponent implements OnInit {
  constructor(
    private toastrService: NbToastrService,

    private inputNameService: InputNameService,

    private chatService: ChatService
  ) {}
  private startChat$ = new Subject<boolean>();

  private physicalPositions = NbGlobalPhysicalPosition;

  userName = '';

  ngOnInit(): void {
    this.chatService.checkConnectStatus();

    this.startChat$
      .pipe(
        filter((boolean) => boolean),
        switchMap(() => {
          return this.chatService.joinLobby(this.userName);
        })
      )
      .subscribe({
        next: (res) => {
          if (res) {
            this.inputNameService.close(this.userName);

            return;
          }

          this.toastrService.show('名稱重複', '╮(╯_╰)╭', {
            position: this.physicalPositions.TOP_RIGHT,
            status: 'danger',
          });
        },
      });
  }

  startChat() {
    const userName = this.userName.trim();
    if (!userName) {
      const arr = ['(#`Д´)ﾉ', '(／‵Д′)／~ ╧╧', '(╬ﾟдﾟ)▄︻┻┳═一'];

      this.toastrService.show(
        '請輸入暱稱',
        arr[Math.floor(Math.random() * 3)],
        {
          position: this.physicalPositions.TOP_RIGHT,
          status: 'danger',
        }
      );
      this.startChat$.next(false);

      return;
    }

    this.startChat$.next(true);
  }
}
