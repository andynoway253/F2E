import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TodoListService } from './todo-list.service';
import { Todo } from './todo.model';
import { TodoStatusType } from './todo-status-type.enum';
import { interval } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit {
  constructor(private service: TodoListService) {}

  @ViewChild('editedTodo')
  editedTodo!: ElementRef;

  todoItem = '';

  todoStatusType = TodoStatusType;

  status = TodoStatusType.All;

  todoList: Todo[] = [];

  activeCount = 0;

  completedCount = 0;

  ngOnInit(): void {
    this.service.todoList$.subscribe({
      next: (res) => {
        this.todoList = res;
      },
    });
    this.service.active$.subscribe({
      next: (res) => {
        this.activeCount = res;
      },
    });
    this.service.completed$.subscribe({
      next: (res) => {
        this.completedCount = res;
      },
    });
  }

  add(): void {
    if (this.todoItem) {
      this.service.add(this.todoItem);
      this.todoItem = '';
    }
  }

  edit(e: Todo): void {
    e.editable = true;

    setTimeout(() => {
      this.editedTodo.nativeElement.focus();
    });
  }

  update(e: Todo, newTitle: string): void {
    if (!e.editing) {
      return;
    }

    const title = newTitle.trim();
    if (title) {
      e.itemTitle = title;
      e.editable = false;

      // 如果沒有名稱則刪除該項待辦事項
    } else {
      const index = this.todoList.indexOf(e);
      if (index !== -1) {
        this.remove(index);
      }
    }
  }

  remove(index: number): void {
    this.service.remove(index);
  }

  removeCompleted(): void {
    this.service.removeCompleted();
  }

  cancelEditing(e: Todo): void {
    e.editable = false;
  }

  toggleCompletion(e: Todo) {
    e.toggleCompletion();

    this.service.getWithCompleted();
  }

  setStatus(status: number) {
    this.status = status;

    this.service.getWithStatus(this.status);
  }

  checkStatus(status: number): boolean {
    return this.status === status;
  }
}
