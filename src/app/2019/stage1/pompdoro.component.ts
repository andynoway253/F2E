import { Component, OnInit } from '@angular/core';
import { Task } from './task.model';

@Component({
  selector: 'app-pompdoro',
  templateUrl: './pompdoro.component.html',
  styleUrls: ['./pompdoro.component.scss'],
})
export class PompdoroComponent implements OnInit {
  constructor() {}

  interval: any;

  leftTime = 5; // 剩餘時間

  status = 0; // 0為初始、1為進行、2為暫停

  taskList: Task[] = [];

  task = ''; //  要添加的任務名稱

  nowMin = ''; //  分鐘

  nowSec = ''; //  秒數

  break = false; //

  canTakeBreak = true;

  ngOnInit(): void {
    this.textRenderer(this.leftTime);
  }

  addTask() {
    if (this.task) {
      this.taskList.push(new Task(this.task));
      this.task = '';
    }
  }

  editTask(task: Task) {}

  removeTask(index: number) {}

  test() {
    console.log(111);
  }

  startTimer() {
    this.status = 1;
    this.interval = setInterval(() => {
      if (this.leftTime > 0) {
        this.leftTime--;
        this.textRenderer(this.leftTime);
      } else if (!this.leftTime && this.canTakeBreak) {
        this.break = true;

        this.timeBreak();
      } else {
        this.timesUp();
      }
    }, 1000);
  }

  pauseTimer() {
    clearInterval(this.interval);

    this.status = 2;
  }

  timesUp() {
    clearInterval(this.interval);

    this.status = 0;

    this.leftTime = 5;

    this.canTakeBreak = true;

    this.break = false;

    this.textRenderer(this.leftTime);
  }

  // 休息時間
  timeBreak() {
    clearInterval(this.interval);

    this.leftTime = 10;

    this.canTakeBreak = false; //  進入休息時間後，要把可休息狀態改為false

    this.textRenderer(this.leftTime);

    this.startTimer();
  }

  textRenderer(seconds: number) {
    const sec = seconds % 60;
    const min = Math.floor(seconds / 60);

    this.nowMin = min.toString().padStart(2, '0');
    this.nowSec = sec.toString().padStart(2, '0');
  }
}
