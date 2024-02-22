import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Note } from '../../model/note.model';
import { NbMenuItem, NbMenuService } from '@nebular/theme';

@Component({
  selector: 'app-noteList',
  templateUrl: './noteList.component.html',
  styleUrls: ['./noteList.component.scss'],
})
export class NoteListComponent implements OnInit {
  constructor(private menuService: NbMenuService) {}

  @Input() noteList: Array<Note>;

  @Input() showType: string = 'grid';

  @Input() mode: string = 'light';

  @Input() changeAction: string = '';

  @Output() selectedChange: EventEmitter<Note> = new EventEmitter();

  @Output() throwNote: EventEmitter<Note> = new EventEmitter(); //  丟到垃圾桶

  @Output() deleteNote: EventEmitter<Note> = new EventEmitter();

  selectedNote: Note;

  noteAction: NbMenuItem[] = [
    { title: '復原', icon: 'undo-outline', hidden: true },
    { title: '最愛', icon: 'star-outline' },
    { title: '刪除', icon: 'trash-2-outline' },
  ];

  ngOnInit(): void {
    this.menuService.onItemClick().subscribe({
      next: (res) => {
        if (res.tag === 'action') {
          if (res.item.title === '最愛') {
            this.selectedNote.favorite = !this.selectedNote.favorite;
          }

          if (res.item.title === '刪除') {
            this.selectedNote.trash
              ? this.deleteNote.emit(this.selectedNote)
              : this.throwNote.emit(this.selectedNote);
          }
        }
      },
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.noteList && !changes.noteList.firstChange) {
      const preNoteList: Array<Note> = changes.noteList.previousValue;
      preNoteList.forEach((note) => (note.selected = false));

      const noteList: Array<Note> = changes.noteList.currentValue;
      noteList.length &&
        this.selectNote(
          noteList[this.changeAction === '增加' ? noteList.length - 1 : 0]
        );
    }
  }

  selectNote(selectNote: Note) {
    if (!selectNote.selected) {
      this.noteList.forEach((note) => (note.selected = false));

      selectNote.selected = true;

      this.selectedNote = selectNote;

      this.selectedChange.emit(selectNote);
    }
  }
}
