import { action, observable } from 'mobx';
import TodoItem from '../core/domain/TodoItem';
import TodoStore from '../core/store/todoStore';

export interface ITodoItemViewModel {
  todoItem: TodoItem
  editing: boolean;
  editText: string;
  toggleTodo(): void;
  deleteTodo(): void;
  toggleEditing(status: boolean): void;
  updateEditTxt(input: string): void;
  updateTodo(): void;
}

export default class TodoItemViewModel implements ITodoItemViewModel {
  @observable public todoItem: TodoItem;
  @observable public editing: boolean;
  @observable public editText: string;
  private todoStore: TodoStore;

  constructor(todoItem: TodoItem, todoStore: TodoStore) {
    this.todoItem = todoItem;
    this.todoStore = todoStore;
    this.editing = false;
    this.editText = todoItem.title;
  }

  @action
  public toggleTodo() {
    this.todoStore.toggleTodo(this.todoItem);
  }

  @action
  public deleteTodo() {
    this.todoStore.deleteTodo(this.todoItem.uuid);
  }

  @action
  public toggleEditing(status: boolean) {
    this.editing = status;
  }

  @action
  public updateEditTxt(input: string) {
    this.editText = input;
  }

  @action
  public async updateTodo() {
    await this.todoStore.updateTitle(this.todoItem, this.editText);
    this.toggleEditing(false);
  }
}
