import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Todo } from './todo.model';

@Injectable({
  providedIn: 'root',
})
export class TodoListService {
  constructor() {}

  private todoList: Array<Todo> = [];

  private status = 0;

  todoList$ = new BehaviorSubject<Array<Todo>>([]);

  completed$ = new BehaviorSubject<number>(0);

  active$ = new BehaviorSubject<number>(0);

  add(title: string): void {
    if (title || title.trim()) {
      this.todoList.push(new Todo(title));

      this.nextTodo();
    }
  }

  remove(idx: number): void {
    this.todoList.splice(idx, 1);

    this.nextTodo();
  }

  removeCompleted(): void {
    this.todoList = this.todoList.filter((todo: Todo) => !todo.completed);

    this.nextTodo();
  }

  getWithCompleted(): void {
    this.nextTodo();
  }

  getWithStatus(status: number): void {
    this.status = status;

    this.nextTodo();
  }

  private nextTodo() {
    this.todoList$.next(
      this.todoList.filter((todo: Todo) =>
        this.status === 0
          ? true
          : this.status === 1
          ? !todo.completed
          : todo.completed
      )
    );

    this.active$.next(
      this.todoList.filter((todo: Todo) => !todo.completed).length
    );

    this.completed$.next(
      this.todoList.filter((todo: Todo) => todo.completed).length
    );
  }
}
