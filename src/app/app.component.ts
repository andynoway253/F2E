import {
  trigger,
  state,
  style,
  transition,
  animate,
  animation,
  query,
  sequence,
  stagger,
  useAnimation,
} from '@angular/animations';
import { Component } from '@angular/core';
import { NbMenuItem, NbMenuService } from '@nebular/theme';

const animationParams = {
  menuWidth: '250px',
  animationStyle: '500ms ease',
};

const SidebarOpenAnimation = animation([
  style({ left: '-{{menuWidth}}' }),
  query('.menu-item', [style({ transform: 'translateX(-{{menuWidth}})' })]),
  sequence([
    animate('200ms', style({ left: '0' })),
    query('.menu-item', [
      stagger(50, [
        animate('{{animationStyle}}', style({ transform: 'none' })),
      ]),
    ]),
  ]),
]);

const SidebarCloseAnimation = animation([
  style({ left: '0' }),
  query('.menu-item', [style({ transform: 'none' })]),
  sequence([
    query('.menu-item', [
      stagger(-50, [
        animate(
          '{{animationStyle}}',
          style({ transform: 'translateX(-{{menuWidth}})' })
        ),
      ]),
    ]),
    animate('200ms', style({ left: '-{{menuWidth}}' })),
  ]),
]);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('menuAnimation', [
      transition(':enter', [
        useAnimation(SidebarOpenAnimation, {
          params: {
            ...animationParams,
          },
        }),
      ]),
      transition(':leave', [
        useAnimation(SidebarCloseAnimation, {
          params: {
            ...animationParams,
          },
        }),
      ]),
    ]),

    trigger('iconAnimation', [
      state(
        'collapsed',
        style({
          transform: 'rotate(0deg)',
        })
      ),
      state(
        'expanded',
        style({
          transform: 'rotate(180deg)',
        })
      ),
      transition('collapsed <=> expanded', animate('0.3s ease')),
    ]),
  ],
})
export class AppComponent {
  constructor(private menuService: NbMenuService) {}

  menuCollapsed = true;

  btnDisabled = false;

  items: NbMenuItem[] = [
    {
      title: '2019',
      expanded: true,
      children: [
        {
          title: '第一關 - 番茄鐘',
          link: '/Pompdoro',
        },
        {
          title: '第二關 - 新接龍',
          link: '/test',
        },
        {
          title: '第三關 - MP3 Player',
          link: '/MP3Player',
        },
        {
          title: '第四關 - 線上支付',
        },
        {
          title: '第五關 - 90 秒挑戰遊戲',
        },
        {
          title: '第六關 - 旅館預約服務',
        },
        {
          title: '第七關 - 匿名聊天室',
        },
        {
          title: '第八關 - 雲端硬碟',
        },
        {
          title: '第九關 - 筆記軟體',
        },
        {
          title: '第十關 - 口罩地圖',
        },
      ],
    },
  ];

  collapseAll() {
    this.menuService.collapseAll('menu');
  }

  toggleMenu() {
    this.menuCollapsed = !this.menuCollapsed;
  }
}
