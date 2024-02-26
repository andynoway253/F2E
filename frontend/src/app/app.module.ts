import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  NbButtonModule,
  NbIconModule,
  NbLayoutModule,
  NbMenuModule,
  NbThemeModule,
} from '@nebular/theme';
import { PompdoroModule } from './2019/stage1/pompdoro.module';
import { MaskMapModule } from './2019/stage10/mask-map.module';
import { MP3PlayerModule } from './2019/stage3/mp3player.module';
import { PaymentModule } from './2019/stage4/payment.module';
import { ChatroomModule } from './2019/stage7/chatroom.module';
import { HttpClientModule } from '@angular/common/http';
import { FreeCellModule } from './2019/stage2/freeCell.module';
import { NoteModule } from './2019/stage9/note.module';
import { GameModule } from './2019/stage5/game.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,

    NbThemeModule.forRoot(),
    NbMenuModule.forRoot(),
    NbLayoutModule,
    NbButtonModule,
    NbIconModule,

    PompdoroModule,
    FreeCellModule,
    MP3PlayerModule,
    PaymentModule,
    GameModule,
    ChatroomModule,
    NoteModule,
    MaskMapModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
