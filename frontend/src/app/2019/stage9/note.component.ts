import { Component, OnInit } from '@angular/core';
import { NbMenuItem } from '@nebular/theme';

@Component({
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss'],
})
export class NoteComponent implements OnInit {
  constructor() {}

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

  ngOnInit(): void {}

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
}
