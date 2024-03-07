import {
  Component,
  HostListener,
  Inject,
  LOCALE_ID,
  OnInit,
  Renderer2,
} from '@angular/core';
import { NbMenuItem, NbMenuService } from '@nebular/theme';
import { Menu, Note } from './model/note.model';
import { formatDate } from '@angular/common';

@Component({
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss'],
})
export class NoteComponent implements OnInit {
  constructor(
    @Inject(LOCALE_ID) public locale: string,

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
      title: '標記',
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

  changeBehavior: string; //  noteList 異動的原因

  showType = [
    { title: '卡片檢視', icon: 'grid-outline' },
    { title: '摘要檢視', icon: 'list-outline' },
    { title: '文字列表檢視', icon: 'menu-outline' },
  ];

  showTypeIcon = 'grid';

  currentSelectedNote: Note;

  noteList: Note[] = [];

  originList: Note[] = [];

  noteAction: NbMenuItem[] = [
    { title: '標記', icon: 'star-outline' },
    { title: '刪除', icon: 'trash-2-outline' },
  ];

  ngOnInit(): void {
    this.renderer.setStyle(document.body, 'overflow', 'hidden');

    const list = localStorage.getItem('list');
    if (list) {
      this.originList = [...this.originList, ...JSON.parse(list)];

      this.onFilter();
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

  onClickMenu(menuItem: Menu) {
    const { title, filter } = menuItem;

    this.filterItem = menuItem;
    this.filterType = title;
    this.filterInputValue = '';

    if (filter === 'trash') {
      this.noteAction = [
        { title: '復原', icon: 'undo-outline' },
        { title: '刪除', icon: 'trash-2-outline' },
      ];
    } else {
      this.noteAction = [
        { title: '標記', icon: 'star-outline' },
        { title: '刪除', icon: 'trash-2-outline' },
      ];
    }

    this.onFilter();
  }

  onFilter(behavior = 'filter') {
    const filters: { [key: string]: (note: Note) => boolean } = {
      all: (note: Note) =>
        (!this.filterInputValue ||
          note.title.includes(this.filterInputValue)) &&
        !note.trash,

      favorite: (note: Note) =>
        (!this.filterInputValue ||
          note.title.includes(this.filterInputValue)) &&
        note.favorite &&
        !note.trash,

      tag: (note: Note) =>
        (!this.filterInputValue || note.tag.includes(this.filterInputValue)) &&
        note.tag.length > 0 &&
        !note.trash,

      calendar: (note: Note) =>
        this.filterInputValue
          ? note.createDate.includes(
              formatDate(this.filterInputValue, 'yyyy-MM-dd', this.locale)
            )
          : true && !note.trash,

      trash: (note: Note) => note.trash,
    };

    const filterFunction = filters[this.filterItem.filter];
    this.noteList = this.originList.filter(filterFunction);

    this.changeBehavior = behavior;
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

    this.filterItem = this.menu[0];

    this.onFilter('add');
  }

  onSelectedChange(e: Note | null) {
    this.currentSelectedNote = e;
  }

  onChangeNoteStatus(e: { note: Note; behavior: string }) {
    const { note, behavior } = e;

    this.originList.forEach((item, idx) => {
      if (item.id === note.id) {
        switch (behavior) {
          case 'delete':
            this.originList.splice(idx, 1);
            break;
          case 'throw':
            note.trash = true;
            break;
          case 'rollback':
            note.trash = false;
            break;
        }
      }
    });
    this.onFilter(behavior !== 'rollback' ? 'delete' : 'filter');
  }
}
