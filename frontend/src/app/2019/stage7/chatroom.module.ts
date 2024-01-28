import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  NbButtonModule,
  NbCardModule,
  NbIconModule,
  NbInputModule,
  NbListModule,
  NbTabsetModule,
  NbDialogModule,
  NbToastrModule,
} from '@nebular/theme';
import { ChatroomComponent } from './chatroom.component';
import { OnlineComponent } from './component/online/online.component';
import { ConfirmDialogComponent } from './dialog/confirm/confirm.component';
import { InputNameDialogComponent } from './dialog/inputName/inputName.component';
import { OnlineDialogComponent } from './dialog/online/online.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,

    NbButtonModule,
    NbCardModule,
    NbIconModule,
    NbInputModule,
    NbListModule,
    NbTabsetModule,
    NbDialogModule.forRoot(),
    NbToastrModule,

    RouterModule.forChild([{ path: '', component: ChatroomComponent }]),
  ],
  declarations: [
    ChatroomComponent,
    OnlineComponent,

    InputNameDialogComponent,
    OnlineDialogComponent,
    ConfirmDialogComponent,
  ],
  exports: [ChatroomComponent],
})
export class ChatroomModule {}
