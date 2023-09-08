import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
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
    trigger('test', [
      state(
        'initial',
        style({
          transform: 'translateX(0px)',
        })
      ),
      state(
        'state1',
        style({
          transform: 'translateX(-308px)',
        })
      ),
      state(
        'state2',
        style({
          transform: 'translateX(-616px)',
        })
      ),
      state(
        'state3',
        style({
          transform: 'translateX(616px)',
        })
      ),
      state(
        'state4',
        style({
          transform: 'translateX(308px)',
        })
      ),
      state(
        'state5',
        style({
          transform: 'translateX(0px)',
        })
      ),
      transition('* => *', animate('0ms')),
    ]),
  ],
})
export class IndexComponent implements OnInit {
  constructor(private route: ActivatedRoute, private router: Router) {}

  animationState: string = 'initial';

  intervalId: any;
  intervalDuration = 3500;

  ngOnInit(): void {
    this.startInterval();
  }

  startInterval() {
    this.intervalId = setInterval(() => {
      switch (this.animationState) {
        case 'initial':
          this.animationState = 'state1';
          this.changeIntervalDuration(3500);
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
          this.changeIntervalDuration(0);
          break;
      }
    }, this.intervalDuration);
  }

  changeIntervalDuration(newDuration: number): void {
    clearInterval(this.intervalId); // 取消当前的定时器

    this.intervalDuration = newDuration; // 更新执行时间

    this.startInterval(); // 创建一个新的定时器
  }
}
