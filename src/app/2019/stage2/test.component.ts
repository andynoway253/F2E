import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  templateUrl: './test.component.html',
})
export class TestComponent implements OnInit {
  constructor() {}

  test = [
    {
      title: '安安',
      content: [
        { topic: '嗨', score: 1 },
        { topic: '你好', score: 2 },
      ],
      score: 0,
    },
    {
      title: '幾歲',
      content: [
        { topic: '18', score: 1 },
        { topic: '19', score: 2 },
      ],
      score: 0,
    },
    {
      title: '住哪',
      content: [
        { topic: '台中', score: 1 },
        { topic: '台北', score: 2 },
      ],
      score: 0,
    },
  ];

  title = '';

  content1 = '';

  content2 = '';

  idx = 0;

  score = 0;

  ngOnInit(): void {
    this.get(this.idx);
  }

  onPreClick() {
    this.idx > 0 && this.idx--;
    this.get(this.idx);
  }

  onNextClick(c: string) {
    if (this.idx === this.test.length) {
      return;
    }

    this.score += this.test[this.idx].content.filter(
      (item) => item.topic === c
    )[0].score;

    this.idx++;

    this.get(this.idx);
  }

  get(i: number) {
    const idx =
      i - 1 < 0 ? 0 : i > this.test.length - 1 ? this.test.length - 1 : i;
    console.log();
    this.title = this.test[idx].title;

    this.content1 = this.test[idx].content[0].topic;

    this.content2 = this.test[idx].content[1].topic;
  }
}
