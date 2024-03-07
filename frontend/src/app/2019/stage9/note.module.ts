import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NoteComponent } from './note.component';
import {
  NB_TIME_PICKER_CONFIG,
  NbButtonModule,
  NbContextMenuModule,
  NbDatepickerModule,
  NbFormFieldModule,
  NbIconModule,
  NbInputModule,
  NbToastrModule,
} from '@nebular/theme';
import { NgxEditorModule } from 'ngx-editor';
import { NoteListComponent } from './component/noteList/noteList.component';
import { EditorFormComponent } from './component/editorForm/editorForm.component';
import { NbDateFnsDateModule } from '@nebular/date-fns';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,

    NbButtonModule,
    NbContextMenuModule,
    NbDatepickerModule.forRoot(),
    NbDateFnsDateModule,
    NbFormFieldModule,
    NbIconModule,
    NbInputModule,
    NbToastrModule,

    NgxEditorModule,

    RouterModule.forChild([{ path: '', component: NoteComponent }]),
  ],
  declarations: [NoteComponent, NoteListComponent, EditorFormComponent],
  exports: [NoteComponent],
})
export class NoteModule {}
