import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Task } from './task.model';
import { NbTabComponent } from '@nebular/theme';

@Component({
  selector: 'app-pompdoro',
  templateUrl: './pompdoro.component.html',
  styleUrls: ['./pompdoro.component.scss'],
})
export class PompdoroComponent implements OnInit {
  constructor() {}

  @ViewChild('editItem') editItem!: ElementRef;

  interval: any;

  taskObj!: Task;

  taskList: Task[] = [];

  completedTasks: Task[] = [];

  incompleteTasks: Task[] = [];

  start = 0;

  newTaskName = ''; //  要添加的任務名稱

  nowMin = '00'; //  分

  nowSec = '00'; //  秒

  ngOnInit(): void {
    this.filterTasks();
  }

  getTask(task: Task) {
    if (this.start === 1) return;

    this.taskObj = task;

    this.textRenderer(task.time);

    this.cancalEditTask(task);
  }

  addTask() {
    if (this.newTaskName) {
      this.taskList.push(new Task(this.newTaskName));
      this.newTaskName = '';

      this.filterTasks();
    }
  }

  editTask(task: Task) {
    if (task.isStart) {
      return;
    }

    task.editable = true;

    this.cancalEditTask(task);
    setTimeout(() => {
      this.editItem.nativeElement.focus();
    });
  }

  updateTask(task: Task, newTitle: string) {
    task.editable = false;

    task.itemName = newTitle;
  }

  removeTask(task: Task) {
    clearInterval(this.interval);

    const index = this.taskList.indexOf(task);
    this.taskList.splice(index, 1);

    this.taskObj = new Task('');

    this.filterTasks();
  }

  //  在編輯其中一個項目時，如果單雙擊其他項目，都必須取消當前任務的編輯狀態
  cancalEditTask(task: Task) {
    this.taskList.forEach((item) => {
      if (item !== task) {
        item.editable = false;
      }
    });
  }

  completedTask(task: Task, e: boolean = true) {
    clearInterval(this.interval);

    this.start = 0;
    task.toggleCompletion(e);
  }

  startTimer(task: Task) {
    if (!task) {
      return;
    }
    this.start = 1;
    task.isStart = true;
    this.interval = setInterval(() => {
      if (task.time > 0) {
        task.time--;
        this.textRenderer(task.time);
      } else if (!task.time && !task.breakStatus) {
        this.timeBreak(task);
      } else {
        this.completedTask(task);
      }
    }, 1000);
  }

  pauseTimer(task: Task) {
    clearInterval(this.interval);

    this.start = 0;

    task.isStart = false;
  }

  //  跳過
  skip(task: Task) {
    clearInterval(this.interval);

    this.completedTask(task);
  }

  //  休息
  timeBreak(task: Task) {
    clearInterval(this.interval);

    task.toggleBreak();

    task.time = 10;

    this.textRenderer(task.time);

    this.startTimer(task);
  }

  textRenderer(seconds: number) {
    const sec = seconds % 60;
    const min = Math.floor(seconds / 60);

    this.nowMin = min.toString().padStart(2, '0');
    this.nowSec = sec.toString().padStart(2, '0');
  }

  onChangeTab(e: NbTabComponent) {
    if (e.tabTitle === '已完成') {
      this.completedTasks = this.taskList.filter((task) => task.completed);
    } else {
      this.incompleteTasks = this.taskList.filter((task) => !task.completed);
    }
  }

  filterTasks() {
    this.completedTasks = this.taskList.filter((task) => task.completed);

    this.incompleteTasks = this.taskList.filter((task) => !task.completed);
  }
}
