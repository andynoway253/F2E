import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { MP3PlayerComponent } from './mp3player.component';
import { SongComponent } from './song/song.component';

const routes: Routes = [
  {
    path: 'MP3Player',
    component: MP3PlayerComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MP3PlayerRoutingModule {}
