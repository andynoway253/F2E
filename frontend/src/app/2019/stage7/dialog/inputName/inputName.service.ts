import { Injectable } from '@angular/core';
import { NbDialogRef, NbDialogService } from '@nebular/theme';
import { InputNameDialogComponent } from './inputName.component';

@Injectable({
  providedIn: 'root',
})
export class InputNameService {
  constructor(private dialogService: NbDialogService) {}

  dialogRef: NbDialogRef<InputNameDialogComponent>;

  open() {
    this.dialogRef = this.dialogService.open(InputNameDialogComponent, {
      closeOnBackdropClick: false,
      closeOnEsc: false,
      hasBackdrop: false,
    });

    return this.dialogRef;
  }

  close(userName?: string) {
    this.dialogRef.close(userName);
  }
}
