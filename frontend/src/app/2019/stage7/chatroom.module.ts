import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ChatroomComponent } from './chatroom.component';
import { ChatService } from './chatroom.service';
import {
  NbButtonModule,
  NbCardModule,
  NbDialogModule,
  NbInputModule,
  NbListModule,
  NbTabsetModule,
  NbToastrModule,
} from '@nebular/theme';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,

    NbButtonModule,
    NbCardModule,
    NbInputModule,
    NbListModule,
    NbTabsetModule,
    NbDialogModule.forChild(),
    NbToastrModule,

    RouterModule.forChild([{ path: '', component: ChatroomComponent }]),
  ],
  declarations: [ChatroomComponent],
  exports: [ChatroomComponent],
})
export class ChatroomModule {}
