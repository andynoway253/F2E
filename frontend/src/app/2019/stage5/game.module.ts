import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { GameComponent } from './game.component';
import { NbButtonModule, NbIconModule } from '@nebular/theme';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,

    NbButtonModule,
    NbIconModule,

    RouterModule.forChild([{ path: '', component: GameComponent }]),
  ],
  declarations: [GameComponent],
  exports: [GameComponent],
})
export class GameModule {}
