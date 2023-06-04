import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PompdoroComponent } from './pompdoro.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbDialogModule,
  NbFormFieldModule,
  NbIconModule,
  NbInputModule,
  NbListModule,
  NbSelectModule,
  NbTabsetModule,
} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { FormsModule } from '@angular/forms';

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
  ],
  declarations: [PompdoroComponent],
  exports: [PompdoroComponent],
})
export class PompdoroModule {}
