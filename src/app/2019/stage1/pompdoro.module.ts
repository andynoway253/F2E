import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import {
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbDialogModule,
  NbFormFieldModule,
  NbListModule,
  NbIconModule,
  NbInputModule,
  NbSelectModule,
  NbTabsetModule,
} from '@nebular/theme';
import { PompdoroComponent } from './pompdoro.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,

    NbButtonModule,
    NbCardModule,
    NbCheckboxModule,
    NbEvaIconsModule,
    NbDialogModule.forChild(),
    NbFormFieldModule,
    NbListModule,
    NbIconModule,
    NbInputModule,
    NbSelectModule,
    NbTabsetModule,

    RouterModule.forChild([{ path: '', component: PompdoroComponent }]),
  ],
  declarations: [PompdoroComponent],
  exports: [PompdoroComponent],
})
export class PompdoroModule {}
