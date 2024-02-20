import { Component, OnInit } from '@angular/core';
import { NbMenuService } from '@nebular/theme';
import { Menu, Note } from './model/note.model';

@Component({
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss'],
})
export class NoteComponent implements OnInit {
  constructor(private menuService: NbMenuService) {}

  mode: 'light' | 'night' = 'light';

  menu: Menu[] = [
    {
      title: '所有筆記',
      icon: 'file-text-outline',
      filter: 'all',
    },
    {
      title: '捷徑',
      icon: 'star',
      filter: 'favorite',
    },
    {
      title: '標籤',
      icon: 'pricetags-outline',
      filter: 'tag',
    },
    {
      title: '月曆',
      icon: 'calendar-outline',
      filter: 'calendar',
    },
    {
      title: '垃圾桶',
      icon: 'trash-2-outline',
      filter: 'trash',
    },
  ];

  filterType = '所有筆記';

  filterItem: Menu = this.menu[0];

  filterInputValue: string;

  showType = [
    { title: '卡片檢視', icon: 'grid-outline' },
    { title: '摘要檢視', icon: 'list-outline' },
    { title: '文字列表檢視', icon: 'menu-outline' },
  ];

  showTypeIcon = 'grid';

  currentSelectedNote: Note;

  noteList: Note[] = [];

  originList: Note[] = [];

  ngOnInit(): void {
    this.menuService.onItemClick().subscribe({
      next: (res) => {
        if (res.tag === 'show') {
          this.showTypeIcon = (res.item.icon as string).split('-')[0];
        }
      },
    });
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

  onFilterByType(menuItem: Menu) {
    const { title, filter } = menuItem;
    this.filterItem = menuItem;
    this.filterType = title;

    const filters: { [key: string]: (note: any) => boolean } = {
      all: (note: Note) =>
        this.filterInputValue
          ? note.title.indexOf(this.filterInputValue) !== -1
          : true,
      favorite: (note: Note) => note.favorite,
      tag: (note: Note) => note.tag.length > 0,
    };

    const filterFunction = filters[filter];
    this.noteList = this.originList.filter(filterFunction);
  }

  onAddNote() {
    const newNote: Note = {
      id: Number(
        Math.random().toString().substring(2, 10) + Date.now()
      ).toString(36),
      title: '',
      content: '',
      tag: [] as string[],
      createDate: '2024/02/05',
      editorDate: '2024/02/05',
      favorite: false,
      selected: false,
    };

    const list = [...this.noteList];
    list.push(newNote);
    this.originList = this.noteList = list;
  }

  onSelectedChange(e: Note) {
    this.currentSelectedNote = e;
  }

  onDeleteNote(e: string) {
    const deleteIndex = this.noteList.findIndex((note) => note.id === e);

    this.noteList.splice(deleteIndex, 1);
  }
}
