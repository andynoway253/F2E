import { Component, OnInit } from '@angular/core';
import { ConfrimService } from './confirm.service';

@Component({
  templateUrl: './confirm.component.html',
})
export class ConfirmDialogComponent implements OnInit {
  constructor(private confrimService: ConfrimService) {}

  ngOnInit(): void {}

  leaveRoom() {
    this.confrimService.close(true);
  }

  stay() {
    this.confrimService.close(false);
  }
}
