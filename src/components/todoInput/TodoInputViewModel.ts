import { action, observable } from 'mobx';
import { ITodoListViewModel } from '../todoList/TodoListViewModel';
import TodoItemViewModel from '../todoItem/TodoItemViewModel';
import todoStore from '../../store/todoStore';

export interface ITodoInputViewModel {
  input: string;
  updateInput(input: string): void;
  addTodo(): void;
}

export default class TodoInputViewModel implements ITodoInputViewModel {
  @observable input: string;

  constructor() {
    this.input = '';
  }

  @action
  updateInput(input: string) {
    this.input = input;
  }

  @action
  addTodo() {
    if (!this.input) {
      return;
    }

    todoStore.addTodo(this.input);
    this.updateInput('');
  }
}