import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NoteComponent } from './note.component';
import { NbButtonModule, NbIconModule, NbMenuModule } from '@nebular/theme';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,

    NbButtonModule,
    NbIconModule,
    NbMenuModule,

    RouterModule.forChild([{ path: '', component: NoteComponent }]),
  ],
  declarations: [NoteComponent],
  exports: [NoteComponent],
})
export class NoteModule {}
