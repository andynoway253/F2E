import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoListComponent } from './todo-list.component';
import { FormsModule } from '@angular/forms';
import { NbButtonModule } from '@nebular/theme';

@NgModule({
  imports: [CommonModule, FormsModule, NbButtonModule],
  declarations: [TodoListComponent],
  exports: [TodoListComponent],
})
export class TodoListModule {}
