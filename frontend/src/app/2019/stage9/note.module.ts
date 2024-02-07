import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NoteComponent } from './note.component';
import {
  NbButtonModule,
  NbContextMenuModule,
  NbFormFieldModule,
  NbIconModule,
  NbInputModule,
  NbMenuModule,
} from '@nebular/theme';
import { NgxEditorModule } from 'ngx-editor';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,

    NbButtonModule,
    NbContextMenuModule,
    NbFormFieldModule,
    NbIconModule,
    NbInputModule,
    NbMenuModule,

    NgxEditorModule,

    RouterModule.forChild([{ path: '', component: NoteComponent }]),
  ],
  declarations: [NoteComponent],
  exports: [NoteComponent],
})
export class NoteModule {}
