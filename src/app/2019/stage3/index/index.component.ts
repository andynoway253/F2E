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
    trigger('animation', [
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

  animationState = 'initial';

  intervalId: any;

  intervalDuration = 3500;

  imageWidth = 278;

  imageHeight = 278;

  imagePaths = Array.from(
    { length: 10 },
    (_, index) =>
      `assets/image/stage3/500x500${index % 5 > 0 ? ` (${index % 5})` : ''}.jpg`
  );

  smallImageWidth = 99;

  smallImageHeight = 99;

  smallImagePaths = Array.from(
    { length: 24 },
    (_, index) =>
      `assets/image/stage3/300x300${
        index % 12 > 0 ? ` (${index % 12})` : ''
      }.jpg`
  );

  test = [
    { url: 'assets/image/stage3/500x500.jpg', singer: '' },
    { url: 'assets/image/stage3/500x500 (1).jpg', singer: '' },
    { url: 'assets/image/stage3/500x500 (2).jpg', singer: '' },
    { url: 'assets/image/stage3/500x500 (3).jpg', singer: '' },
    { url: 'assets/image/stage3/500x500 (4).jpg', singer: '' },
    { url: 'assets/image/stage3/500x500.jpg', singer: '' },
    { url: 'assets/image/stage3/500x500 (1).jpg', singer: '' },
    { url: 'assets/image/stage3/500x500 (2).jpg', singer: '' },
    { url: 'assets/image/stage3/500x500 (3).jpg', singer: '' },
    { url: 'assets/image/stage3/500x500 (4).jpg', singer: '' },
  ];

  animationStates: string[] = [
    'initial',
    'state1',
    'state2',
    'state3',
    'state4',
    'state5',
  ];

  currentStateIndex: number = 0;

  ngOnInit(): void {
    this.startInterval();
  }

  startInterval() {
    const DURATION = 3500;

    this.intervalId = setInterval(() => {
      this.currentStateIndex =
        (this.currentStateIndex + 1) % this.animationStates.length;
      this.animationState = this.animationStates[this.currentStateIndex];
      this.changeIntervalDuration(this.currentStateIndex === 0 ? 0 : DURATION);
    }, this.intervalDuration);
  }

  changeIntervalDuration(newDuration: number): void {
    clearInterval(this.intervalId); // 取消当前的定时器

    this.intervalDuration = newDuration; // 更新执行时间

    this.startInterval(); // 创建一个新的定时器
  }

  click(e: any) {
    console.log(e);
  }
}
