import { Component } from '@angular/core';
import { NbMenuItem, NbMenuService } from '@nebular/theme';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private menuService: NbMenuService) {}

  items: NbMenuItem[] = [
    {
      title: '2019',
      expanded: true,
      children: [
        {
          title: '第一關 - 番茄鐘',
          link:'/Pompdoro'
        },
        {
          title: '第二關 - 新接龍',
          link:'/test'
        },
        {
          title: '第三關 - MP3 Player',
          link:'/MP3Player'
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
}
