import { Component, OnInit } from '@angular/core';
import {
  NbDialogRef,
  NbGlobalPhysicalPosition,
  NbToastrService,
} from '@nebular/theme';
import { InputNameService } from './inputName.service';

@Component({
  templateUrl: './inputName.component.html',
})
export class InputNameDialogComponent implements OnInit {
  constructor(
    private toastrService: NbToastrService,

    private inputNameService: InputNameService
  ) {}

  userName = '';

  ngOnInit(): void {}

  startChat() {
    const userName = this.userName.trim();
    if (!userName) {
      const physicalPositions = NbGlobalPhysicalPosition;

      const arr = ['(#`Д´)ﾉ', '(／‵Д′)／~ ╧╧', '(╬ﾟдﾟ)▄︻┻┳═一'];

      this.toastrService.show(
        '請輸入暱稱',
        arr[Math.floor(Math.random() * 3)],
        {
          position: physicalPositions.TOP_RIGHT,
          status: 'danger',
        }
      );
      return;
    }

    this.inputNameService.close(userName);
  }
}
