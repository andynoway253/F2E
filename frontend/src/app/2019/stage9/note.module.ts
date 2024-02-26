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
  NbToastrModule,
} from '@nebular/theme';
import { NgxEditorModule } from 'ngx-editor';
import { NoteListComponent } from './component/noteList/noteList.component';
import { EditorFormComponent } from './component/editorForm/editorForm.component';

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
    NbToastrModule,

    NgxEditorModule,

    RouterModule.forChild([{ path: '', component: NoteComponent }]),
  ],
  declarations: [NoteComponent, NoteListComponent, EditorFormComponent],
  exports: [NoteComponent],
})
export class NoteModule {}
