import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ChatroomComponent } from './chatroom.component';
import {
  NbButtonModule,
  NbCardModule,
  NbDialogModule,
  NbDialogRef,
  NbIconModule,
  NbInputModule,
  NbListModule,
  NbTabsetModule,
  NbToastrModule,
} from '@nebular/theme';
import { InputNameComponent } from './dialog/inputNameDialog/inputName.component';

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
  declarations: [ChatroomComponent, InputNameComponent],
  exports: [ChatroomComponent],
})
export class ChatroomModule {}
