import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { NbButtonModule, NbDialogModule } from '@nebular/theme';
import { FreeCellComponent } from './freeCell.component';
import { CardComponent } from './card/card.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,

    DragDropModule,

    NbButtonModule,
    NbEvaIconsModule,
    NbDialogModule.forChild(),

    RouterModule.forChild([{ path: '', component: FreeCellComponent }]),
  ],
  declarations: [FreeCellComponent, CardComponent],
  exports: [FreeCellComponent],
})
export class FreeCellModule {}
