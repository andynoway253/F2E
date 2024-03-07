import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  QueryList,
  SimpleChanges,
  ViewChildren,
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

  @ViewChildren('listContent') listContent: QueryList<ElementRef>;

  @ViewChildren('list') list: QueryList<any>;

  @Input() noteList: Array<Note>;

  @Input() showType: string = 'grid';

  @Input() mode: string = 'light';

  @Input() changeBehavior: string = '';

  @Input() noteAction: NbMenuItem[] = [];

  @Output() selectedChange: EventEmitter<Note | null> = new EventEmitter();

  @Output() changeNoteStatus: EventEmitter<{ note: Note; behavior: string }> =
    new EventEmitter();

  selectedNote: Note;

  currentSelectedIndex: number;

  ngOnInit(): void {
    this.menuService.onItemClick().subscribe({
      next: (res) => {
        if (res.tag === 'action') {
          if (res.item.title === '標記') {
            this.selectedNote.favorite = !this.selectedNote.favorite;
          }

          if (res.item.title === '刪除') {
            this.selectedNote.trash
              ? this.changeNoteStatus.emit({
                  note: this.selectedNote,
                  behavior: 'delete',
                })
              : this.changeNoteStatus.emit({
                  note: this.selectedNote,
                  behavior: 'throw',
                });
          }

          if (res.item.title === '復原') {
            this.changeNoteStatus.emit({
              note: this.selectedNote,
              behavior: 'rollback',
            });
          }
        }
      },
    });
  }

  ngAfterViewInit() {
    this.list.changes.subscribe({
      next: () => {
        this.changeBehavior === 'add' && this.scrollTo();
      },
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.noteList) {
      const noteList: Array<Note> = changes.noteList.currentValue;
      noteList?.forEach((note) => (note.selected = false));
      this.selectNote(
        noteList.length
          ? this.changeBehavior === 'add'
            ? noteList.length - 1
            : this.changeBehavior === 'filter'
            ? 0
            : this.changeBehavior === 'delete'
            ? this.currentSelectedIndex === noteList.length
              ? this.currentSelectedIndex - 1
              : this.currentSelectedIndex
            : 0
          : null
      );
    }
  }

  selectNote(selectIndex: number | null) {
    console.log(selectIndex);
    if (selectIndex === null) {
      this.selectedChange.emit(null);

      return;
    }

    const selectNote: Note = this.noteList[selectIndex];

    this.currentSelectedIndex = selectIndex;

    if (!selectNote.selected) {
      this.noteList.forEach((note) => (note.selected = false));

      selectNote.selected = true;

      this.selectedNote = selectNote;

      this.selectedChange.emit(selectNote);
    }
  }

  private scrollTo() {
    const nativeElement = this.listContent.first.nativeElement;

    //  滾動到最下方
    nativeElement.scrollTo({
      top: nativeElement.scrollHeight,
      behavior: 'smooth',
    });
  }
}
