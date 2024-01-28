import { Injectable } from '@angular/core';
import { NbDialogRef, NbDialogService } from '@nebular/theme';
import { ConfirmDialogComponent } from './confirm.component';

@Injectable({
  providedIn: 'root',
})
export class ConfrimService {
  constructor(private dialogService: NbDialogService) {}

  private dialogRef: NbDialogRef<ConfirmDialogComponent>;

  open() {
    this.dialogRef = this.dialogService.open(ConfirmDialogComponent);

    return this.dialogRef;
  }

  close(leave?: boolean) {
    this.dialogRef.close(leave);
  }
}
