import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';

import { MP3PlayerComponent } from './mp3player.component';
import { RouterModule } from '@angular/router';
import { MP3PlayerRoutingModule } from './mp3player-routing.module';
import { NbLayoutModule } from '@nebular/theme';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    RouterModule,

    NbLayoutModule,

    MP3PlayerRoutingModule,
  ],
  declarations: [MP3PlayerComponent],
})
export class MP3PlayerModule {}
