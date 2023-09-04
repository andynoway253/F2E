import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { AlbumComponent } from './album/album.component';
import { ArtistComponent } from './artist/artist.component';
import { MP3PlayerComponent } from './mp3player.component';
import { SongComponent } from './song/song.component';

@NgModule({
  imports: [CommonModule, FormsModule, FlexLayoutModule],
  declarations: [
    MP3PlayerComponent,
    AlbumComponent,
    ArtistComponent,
    SongComponent,
  ],
  exports: [MP3PlayerComponent],
})
export class MP3PlayerModule {}
