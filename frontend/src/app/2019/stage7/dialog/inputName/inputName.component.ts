import { Component, OnInit } from '@angular/core';
import {
  NbDialogRef,
  NbGlobalPhysicalPosition,
  NbToastrService,
} from '@nebular/theme';

@Component({
  templateUrl: './inputName.component.html',
})
export class InputNameDialogComponent implements OnInit {
  constructor(
    private toastrService: NbToastrService,

    private dialogRef: NbDialogRef<InputNameDialogComponent>
  ) {}

  userName = '';

  ngOnInit(): void {}

  startChat() {
    if (!this.userName.trim()) {
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

    this.dialogRef.close(this.userName);
  }
}
