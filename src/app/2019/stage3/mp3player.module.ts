import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NbLayoutModule } from '@nebular/theme';
import { IndexComponent } from './index/index.component';
import { MP3PlayerRoutingModule } from './mp3player-routing.module';
import { MP3PlayerComponent } from './mp3player.component';
import { SongComponent } from './song/song.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,

    NbLayoutModule,

    MP3PlayerRoutingModule,

    RouterModule.forChild([
      { path: 'Index', component: IndexComponent },
      { path: 'Song', component: SongComponent },
      { path: '', redirectTo: 'Index', pathMatch: 'full' },
    ]),
  ],
  declarations: [MP3PlayerComponent, IndexComponent, SongComponent],
  exports: [MP3PlayerComponent],
})
export class MP3PlayerModule {}
