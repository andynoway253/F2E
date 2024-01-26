import { Component, OnInit } from '@angular/core';
import { NbDialogRef, NbToastrService } from '@nebular/theme';

@Component({
  templateUrl: './inputName.component.html',
  styleUrls: ['./inputName.component.scss'],
})
export class InputNameComponent implements OnInit {
  constructor(
    private toastrService: NbToastrService,

    private dialogRef: NbDialogRef<InputNameComponent>
  ) {}

  userName = '';

  ngOnInit(): void {}

  startChat() {
    if (!this.userName.trim()) {
      return;
    }

    this.dialogRef.close(this.userName);
  }
}
