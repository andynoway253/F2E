import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NbLayoutModule } from '@nebular/theme';
import { IndexComponent } from './index/index.component';
import { MP3PlayerRoutingModule } from './mp3player-routing.module';
import { MP3PlayerComponent } from './mp3player.component';
import { SongComponent } from './song/song.component';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    NbLayoutModule,
    MP3PlayerRoutingModule,
  ],
  declarations: [MP3PlayerComponent, IndexComponent, SongComponent],
})
export class MP3PlayerModule {}
