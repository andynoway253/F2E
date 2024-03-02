import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Editor, Toolbar } from 'ngx-editor';
import { Note } from '../../model/note.model';
import {
  NbGlobalPhysicalPosition,
  NbTagComponent,
  NbToastrService,
} from '@nebular/theme';

@Component({
  selector: 'app-editorForm',
  templateUrl: './editorForm.component.html',
  styleUrls: ['./editorForm.component.scss'],
})
export class EditorFormComponent implements OnInit {
  constructor(private toastrService: NbToastrService) {}

  @Input() selectedNote: Note;

  @Input() mode: string = 'light';

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
      editorTag: new FormControl(
        { value: '', disabled: true },
        { updateOn: 'change' }
      ),
    },
    { updateOn: 'blur' }
  );

  tags: string[] = [];

  ngOnInit(): void {
    this.editor = new Editor();

    this.form.get('editorTitle').valueChanges.subscribe({
      next: (title) => {
        if (this.selectedNote) {
          this.selectedNote.title = title;
        }
      },
    });

    this.form.get('editorContent').valueChanges.subscribe({
      next: (content) => {
        if (this.selectedNote) {
          this.selectedNote.content = content;
        }
      },
    });
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.selectedNote) {
      changes.selectedNote.currentValue
        ? this.form.enable({ emitEvent: false })
        : this.form.disable({ emitEvent: false });

      const selectedNote = changes.selectedNote.currentValue as Note;

      this.form.patchValue({
        editorTitle: selectedNote?.title,
        editorContent: selectedNote?.content,
        editorTag: '',
      });

      this.tags = selectedNote?.tag;
    }
  }

  onCheckInput() {
    const editorTitleControl = this.form.get('editorTitle');
    const currentValue = editorTitleControl.value;

    if (currentValue === '無標題') {
      editorTitleControl.setValue('');
    } else if (currentValue === '') {
      editorTitleControl.setValue('無標題');
    }
  }

  onTagAdd(): void {
    const editorTag = this.form.get('editorTag');
    if (!editorTag.value) {
      return;
    }

    const physicalPositions = NbGlobalPhysicalPosition;

    if (this.tags.length === 10) {
      this.toastrService.show('Tag最多十個', '太多了拉', {
        position: physicalPositions.TOP_RIGHT,
        status: 'warning',
      });
      editorTag.reset();

      return;
    }

    if (this.tags.includes(editorTag.value)) {
      this.toastrService.show('已經有這個標籤囉', '重複', {
        position: physicalPositions.TOP_RIGHT,
        status: 'warning',
      });
      editorTag.reset();

      return;
    }

    this.tags.push(editorTag.value);

    this.selectedNote.tag = this.tags;

    editorTag.reset();
  }

  onTagRemove(tag: string) {
    this.tags = this.tags.filter((item) => item !== tag);

    this.selectedNote.tag = this.tags;
  }
}
