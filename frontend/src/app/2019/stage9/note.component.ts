import { Component, HostListener, OnInit, Renderer2 } from '@angular/core';
import { NbMenuService } from '@nebular/theme';
import { Menu, Note } from './model/note.model';

@Component({
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss'],
})
export class NoteComponent implements OnInit {
  constructor(
    private renderer: Renderer2,

    private menuService: NbMenuService
  ) {}

  @HostListener('window:beforeunload')
  canDeactivate(): boolean {
    this.originList.length
      ? localStorage.setItem('list', JSON.stringify(this.originList))
      : localStorage.removeItem('list');

    return true;
  }

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

  changeAction: string; //  noteList 異動的原因

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
    this.renderer.setStyle(document.body, 'overflow', 'hidden');

    const list = localStorage.getItem('list');
    if (list) {
      this.originList = [...this.originList, ...JSON.parse(list)];

      this.onFilter(this.filterItem);
    }

    this.menuService.onItemClick().subscribe({
      next: (res) => {
        if (res.tag === 'show') {
          this.showTypeIcon = (res.item.icon as string).split('-')[0];
        }
      },
    });
  }

  ngOnDestroy(): void {
    this.renderer.removeStyle(document.body, 'overflow');

    localStorage.setItem('list', JSON.stringify(this.originList));
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

  onFilter(menuItem: Menu) {
    const { title, filter } = menuItem;
    this.filterItem = menuItem;
    this.filterType = title;

    const filters: { [key: string]: (note: Note) => boolean } = {
      all: (note: Note) =>
        (this.filterInputValue
          ? note.title.includes(this.filterInputValue)
          : true) && !note.trash,
      favorite: (note: Note) => note.favorite && !note.trash,
      tag: (note: Note) =>
        (this.filterInputValue
          ? note.tag.includes(this.filterInputValue) && note.tag.length > 0
          : note.tag.length > 0) && !note.trash,
      calendar: (note: Note) => true,
      trash: (note: Note) => note.trash,
    };

    const filterFunction = filters[filter];
    this.noteList = this.originList.filter(filterFunction);

    this.changeAction = '篩選';
  }

  onAddNote() {
    const newNote: Note = {
      id: Number(
        Math.random().toString().substring(2, 10) + Date.now()
      ).toString(36),
      title: '無標題',
      content: '',
      tag: [] as string[],
      createDate: new Date().toISOString().split('T')[0],
      editorDate: new Date().toISOString().split('T')[0],
      favorite: false,
      selected: false,
      trash: false,
    };

    this.originList = [...this.originList, newNote];

    this.onFilter(this.menu[0]);

    this.changeAction = '增加';
  }

  onSelectedChange(e: Note | null) {
    this.currentSelectedNote = e;
  }

  onThrowNote(e: Note) {
    this.originList.forEach((note) => {
      if (note.id === e.id) {
        note.trash = true;
      }
    });

    this.onFilter(this.filterItem);
  }

  onDeleteNote(e: Note) {
    const deleteIndex = this.originList.findIndex((note) => note.id === e.id);

    this.originList.splice(deleteIndex, 1);

    this.onFilter(this.filterItem);
  }
}
