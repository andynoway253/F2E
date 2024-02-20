import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Editor, Toolbar } from 'ngx-editor';
import { Note } from '../../model/note.model';

@Component({
  selector: 'app-editorForm',
  templateUrl: './editorForm.component.html',
  styleUrls: ['./editorForm.component.scss'],
})
export class EditorFormComponent implements OnInit {
  constructor() {}

  @Input() selectedNote: Note;

  editor: Editor;

  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];

  form = new FormGroup(
    {
      editorTitle: new FormControl({ value: '', disabled: true }),
      editorContent: new FormControl({ value: '', disabled: true }),
    },
    { updateOn: 'blur' }
  );

  ngOnInit(): void {
    this.editor = new Editor();

    this.form.get('editorTitle').valueChanges.subscribe({
      next: (title) => {
        this.selectedNote.title = title;
      },
    });

    this.form.get('editorContent').valueChanges.subscribe({
      next: (content) => {
        this.selectedNote.content = content;
      },
    });
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.selectedNote && !changes.selectedNote.firstChange) {
      changes.selectedNote.currentValue
        ? this.form.enable({ emitEvent: false })
        : this.form.disable({ emitEvent: false });

      const selectedNote = changes.selectedNote.currentValue as Note;

      this.form.patchValue({
        editorTitle: selectedNote.title,
        editorContent: selectedNote.content,
      });
    }
  }
}
