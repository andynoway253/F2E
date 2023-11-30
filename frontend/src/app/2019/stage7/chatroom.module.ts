import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ChatroomComponent } from './chatroom.component';
import { ChatService } from './chatroom.service';
import { NbButtonModule, NbInputModule } from '@nebular/theme';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,

    NbButtonModule,
    NbInputModule,

    RouterModule.forChild([{ path: '', component: ChatroomComponent }]),
  ],
  declarations: [ChatroomComponent],
  exports: [ChatroomComponent],
  providers: [ChatService],
})
export class ChatroomModule {}
