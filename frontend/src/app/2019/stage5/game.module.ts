import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { GameComponent } from './game.component';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,

    RouterModule.forChild([{ path: '', component: GameComponent }]),
  ],
  declarations: [GameComponent],
  exports: [GameComponent],
})
export class GameModule {}
