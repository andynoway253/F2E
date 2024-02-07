import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { NbMenuService } from '@nebular/theme';
import { Toolbar, Validators, Editor } from 'ngx-editor';
import { Note } from './model/note.model';

@Component({
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss'],
})
export class NoteComponent implements OnInit {
  constructor(private menuService: NbMenuService) {}

  mode: 'light' | 'night' = 'light';

  menu = [
    {
      title: '所有筆記',
      icon: 'file-text-outline',
    },
    {
      title: '捷徑',
      icon: 'star',
    },
    {
      title: '標籤',
      icon: 'pricetags-outline',
    },
    {
      title: '月曆',
      icon: 'calendar-outline',
    },

    {
      title: '垃圾桶',
      icon: 'trash-2-outline',
    },
  ];

  showType = [
    { title: '卡片檢視', icon: 'grid-outline', showType: true },
    { title: '摘要檢視', icon: 'list-outline', showType: true },
    { title: '文字列表檢視', icon: 'menu-outline', showType: true },
  ];

  noteAction = [
    { title: '最愛', icon: 'star-outline' },
    { title: '刪除', icon: 'trash-2-outline' },
  ];

  showTypeIcon = 'grid';

  noteList: Note[] = [
    // {
    //   title: 'test1',
    //   content: 'testtest',
    //   tag: ['test1', 'test2'],
    //   favorite: true,
    //   createDate: '2024/02/05',
    //   editorDate: '2024/02/05',
    //   selected: false,
    // },
  ];

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
      editorContent: new FormControl('', Validators.required()),
    },
    { updateOn: 'blur' }
  );

  ngOnInit(): void {
    this.editor = new Editor();

    this.menuService.onItemClick().subscribe({
      next: (res: any) => {
        if (res.item.showType) {
          console.log(res.item.icon.split('-')[0]);
          this.showTypeIcon = res.item.icon.split('-')[0] as string;
        }
      },
    });

    this.form.get('editorContent').valueChanges.subscribe({
      next: (res) => {
        console.log(res);
      },
    });
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }

  classMode(className: string) {
    return {
      [className]: true,
      light: this.mode === 'light',
      night: this.mode === 'night',
    };
  }

  changeMode(mode: 'light' | 'night') {
    this.mode = mode;
  }

  addNote() {
    this.noteList.forEach((note) => (note.selected = false));

    this.noteList.push({
      title: '',
      content: '',
      tag: [],
      favorite: false,
      createDate: '2024/02/05',
      editorDate: '2024/02/05',

      selected: true,
    });
  }

  selectNote(selectNote: Note) {
    this.noteList.forEach((note) => (note.selected = false));

    selectNote.selected = true;
  }

  action(selectNote: Note) {}
}
