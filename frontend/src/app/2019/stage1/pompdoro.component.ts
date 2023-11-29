import {
  Component,
  ElementRef,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { Task } from './task.model';
import { NbDialogService, NbTabComponent } from '@nebular/theme';

@Component({
  templateUrl: './pompdoro.component.html',
  styleUrls: ['./pompdoro.component.scss'],
})
export class PompdoroComponent implements OnInit {
  constructor(private dialogService: NbDialogService) {}

  @ViewChild('editItem') editItem!: ElementRef;

  @ViewChild('audioPlayer')
  audioPlayer!: ElementRef;

  interval: any;

  taskObj!: Task;

  taskList: Task[] = [];

  completedTasks: Task[] = [];

  incompleteTasks: Task[] = [];

  newTaskName = ''; //  要添加的任務名稱

  nowMin = '00'; //  分

  nowSec = '00'; //  秒

  dashoffset = 1570;

  selectedWorkTime = 5; //  預設25分鐘

  selectedBreakTime = 10; //  預設5分鐘

  selectedWorkFinishMusic = 'ring';

  selectedBreakEndMusic = 'phoneRing';

  audio = 'ring';

  ngOnInit(): void {
    this.filterTasks();
  }

  getTask(task: Task) {
    if (task.conduct) return;

    this.taskObj = task;

    this.textRenderer(task.remainingTime);

    this.cancalEditTask(task);
  }

  addTask() {
    if (this.newTaskName) {
      this.taskList.push(
        new Task({
          title: this.newTaskName,
          originWorkTime: this.selectedWorkTime,
          originBreakTime: this.selectedBreakTime,
          workRing: this.selectedWorkFinishMusic,
          breakRing: this.selectedBreakEndMusic,
        })
      );
      this.newTaskName = '';

      this.filterTasks();
    }
  }

  editTask(task: Task) {
    if (task.conduct) {
      return;
    }

    task.editMode = true;

    this.cancalEditTask(task);
    setTimeout(() => {
      this.editItem.nativeElement.focus();
    });
  }

  updateTask(task: Task, newTitle: string) {
    task.editMode = false;

    task.title = newTitle;
  }

  removeTask(task: Task) {
    clearInterval(this.interval);

    const index = this.taskList.indexOf(task);
    this.taskList.splice(index, 1);

    this.taskObj = new Task({});

    this.filterTasks();
  }

  //  在編輯其中一個項目時，如果單雙擊其他項目，都必須取消當前任務的編輯狀態
  cancalEditTask(task: Task) {
    this.taskList.forEach((item) => {
      if (item !== task) {
        item.editMode = false;
      }
    });
  }

  completedTask(task: Task, e: boolean = true) {
    clearInterval(this.interval);

    task.toggleCompletion(e);

    //  休息結束，播放休息完成音樂
    this.playMusic(task, 'break');
  }

  startTimer(task: Task) {
    if (!task) {
      return;
    }
    task.conduct = true;

    const dashoffsetStep =
      1570 / (task.break ? task.originBreakTime : task.originWorkTime);
    this.interval = setInterval(() => {
      if (task.remainingTime > 0) {
        task.remainingTime--;

        task.dashoffset += -dashoffsetStep;

        this.textRenderer(task.remainingTime);
      } else if (!task.remainingTime && !task.break) {
        this.takeBreak(task);
      } else {
        this.completedTask(task);
      }
    }, 1000);
  }

  pauseTimer(task: Task) {
    clearInterval(this.interval);

    task.conduct = false;
  }

  //  跳過
  skip(task: Task) {
    clearInterval(this.interval);

    this.completedTask(task);
  }

  //  休息
  takeBreak(task: Task) {
    clearInterval(this.interval);

    task.toggleBreak();

    task.remainingTime = task.originBreakTime;

    this.textRenderer(task.remainingTime);

    this.startTimer(task);

    //  工作完成，播放工作完成音樂
    this.playMusic(task, 'work');
  }

  textRenderer(seconds: number) {
    const sec = seconds % 60;
    const min = Math.floor(seconds / 60);

    this.nowMin = min.toString().padStart(2, '0');
    this.nowSec = sec.toString().padStart(2, '0');
  }

  onChangeTab(e: NbTabComponent) {
    if (e.tabTitle === '已完成') {
      this.completedTasks = this.taskList.filter((task) => task.done);
    } else {
      this.incompleteTasks = this.taskList.filter((task) => !task.done);
    }
  }

  filterTasks() {
    this.completedTasks = this.taskList.filter((task) => task.done);

    this.incompleteTasks = this.taskList.filter((task) => !task.done);
  }

  playMusic(task: Task, timing: string) {
    timing === 'work'
      ? (this.audio = task.workFinishMusic)
      : (this.audio = task.breakEndMusic);

    this.audioPlayer.nativeElement.load();
    this.audioPlayer.nativeElement.play();
  }

  openSetting(dialog: TemplateRef<any>) {
    this.dialogService.open(dialog);
  }

  openReport() {
    alert('沒做');
  }
}
