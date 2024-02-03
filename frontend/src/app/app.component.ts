import { AppService } from './app.service';
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
  menuWidth: '300px',
  animationStyle: '500ms',
};

const SidebarOpenAnimation = animation([
  style({ left: '-{{menuWidth}}', 'max-width': '{{menuWidth}}' }),
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
  query('.menu-close-button', [style({ transform: 'none' })]),
  sequence([
    query('.menu-item', [
      stagger(-50, [
        animate(
          '{{animationStyle}}',
          style({ transform: 'translateX(-{{menuWidth}})' })
        ),
      ]),
    ]),
    query('.menu-close-button', [
      animate('200ms', style({ transform: 'rotate(180deg)' })),
    ]),
    animate('150ms', style({ left: '-300px' })),
  ]),
]);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('slideAnimation', [
      state('collapsed', style({ left: '-300px', 'max-width': '0px' })),
      transition(
        '* => expanded',
        useAnimation(SidebarOpenAnimation, {
          params: {
            ...animationParams,
          },
        })
      ),
      transition(
        '* => collapsed',
        useAnimation(SidebarCloseAnimation, {
          params: {
            ...animationParams,
          },
        })
      ),
    ]),
  ],
})
export class AppComponent {
  constructor(
    private appService: AppService,
    private menuService: NbMenuService
  ) {}

  menuCollapsed = false;

  showOpenBtn = false;

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
          title: '第二關 - 新接龍(沒做)',
          link: '/FreeCell',
        },
        {
          title: '第三關 - MP3 Player(施工中)',
          link: '/MP3Player/Index',
        },
        {
          title: '第四關 - 線上支付',
          link: '/Payment',
        },
        {
          title: '第五關 - 90 秒挑戰遊戲(沒做)',
        },
        {
          title: '第六關 - 旅館預約服務(沒做)',
        },
        {
          title: '第七關 - 匿名聊天室',
          link: '/Chatroom',
        },
        {
          title: '第八關 - 雲端硬碟(沒做)',
        },
        {
          title: '第九關 - 筆記軟體(沒做)',
        },
        {
          title: '第十關 - 口罩地圖',
          link: '/MaskMap',
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

  onAnimationStart(e: any) {
    if (e.fromState === 'collapsed' && e.toState === 'expanded') {
      this.showOpenBtn = false;

      this.appService.resize$.next();
    }
  }

  onAnimationDone(e: any) {
    if (e.toState === 'collapsed') {
      this.showOpenBtn = true;

      this.appService.resize$.next();
    }
  }
}
