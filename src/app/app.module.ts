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
import { MP3PlayerModule } from './2019/stage3/mp3player.module';
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
    NbLayoutModule,
    NbButtonModule,
    NbIconModule,

    PompdoroModule,
    MP3PlayerModule,
    PaymentModule,
    MaskMapModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
