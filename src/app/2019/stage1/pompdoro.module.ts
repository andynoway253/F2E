import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PompdoroComponent } from './pompdoro.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbFormFieldModule,
  NbIconModule,
  NbInputModule,
  NbListModule,
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
    NbFormFieldModule,
    NbListModule,
    NbInputModule,
    NbIconModule,
    NbEvaIconsModule,
  ],
  declarations: [PompdoroComponent],
  exports: [PompdoroComponent],
})
export class PompdoroModule {}
