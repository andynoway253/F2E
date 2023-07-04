import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './mp3player.component.html',
  styleUrls: ['./mp3player.component.scss'],
  animations: [
    trigger('slideAnimation', [
      state(
        'initial',
        style({
          transform: 'translateX(0%)',
        })
      ),
      state(
        'state1',
        style({
          transform: 'translateX(-10%)',
        })
      ),
      state(
        'state2',
        style({
          transform: 'translateX(-20%)',
        })
      ),
      state(
        'state3',
        style({
          transform: 'translateX(-30%)',
        })
      ),
      state(
        'state4',
        style({
          transform: 'translateX(-40%)',
        })
      ),
      state(
        'state5',
        style({
          transform: 'translateX(-50%)',
        })
      ),
      transition('state5 => initial', animate('0ms')),
      transition('* => *', animate('2000ms ease-out')),
    ]),
  ],
})
export class MP3PlayerComponent implements OnInit {
  constructor() {}

  animationState: string = 'initial';

  intervalId: any;
  intervalDuration: number = 1000; // 初始执行时间为 1 秒

  ngOnInit(): void {
    // this.startInterval();

    setInterval(() => {
      switch (this.animationState) {
        case 'initial':
          this.animationState = 'state1';
          break;
        case 'state1':
          this.animationState = 'state2';
          break;
        case 'state2':
          this.animationState = 'state3';
          break;
        case 'state3':
          this.animationState = 'state4';
          break;
        case 'state4':
          this.animationState = 'state5';
          break;
        case 'state5':
          this.animationState = 'initial';
          break;
        default:
          break;
      }
    }, 3500);
  }

  // startInterval() {
  //   this.intervalId = setInterval(() => {}, this.intervalDuration);
  // }

  // changeIntervalDuration(newDuration: number): void {
  //   clearInterval(this.intervalId); // 取消当前的定时器

  //   this.intervalDuration = newDuration; // 更新执行时间

  //   this.startInterval(); // 创建一个新的定时器
  // }
}
