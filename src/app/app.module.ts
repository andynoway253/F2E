import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodoListModule } from './todoList/todo-list.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  NbButtonModule,
  NbCardModule,
  NbIconModule,
  NbLayoutModule,
  NbListModule,
  NbMenuModule,
  NbSidebarModule,
  NbThemeModule,
} from '@nebular/theme';
import { PompdoroModule } from './2019/stage1/pompdoro.module';
import { MP3PlayerModule } from './2019/stage3/mp3player.module';
import { PaymentComponent } from './2019/stage4/payment.component';
import { PaymentModule } from './2019/stage4/payment.module';
import { MaskMapModule } from './2019/stage10/mask-map.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,

    NbThemeModule.forRoot(),
    NbMenuModule.forRoot(),
    NbSidebarModule.forRoot(),
    NbLayoutModule,
    NbButtonModule,
    NbCardModule,
    NbIconModule,
    NbListModule,

    FlexLayoutModule,

    TodoListModule,
    PompdoroModule,
    MP3PlayerModule,
    PaymentModule,
    MaskMapModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
