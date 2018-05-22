import { observable, action } from 'mobx';

import uuidGenerator from '../utils/uuidGenerator';

export interface ITodoItem {
  title: string;
  completed: boolean;
  uuid: string;
  createdAt: number;
  updatedAt: number;
}

export default class TodoItem implements ITodoItem {
  @observable title: string;
  @observable completed: boolean;
  @observable uuid: string;
  @observable createdAt: number;
  @observable updatedAt: number;

  constructor(
    title: string,
    completed: boolean = false,
    uuid?:string,
    createdAt?:number,
    updatedAt?:number
  ) {
    const now = Date.now();
    this.title = title;
    this.completed = completed;
    this.uuid = uuid || uuidGenerator();
    this.createdAt = createdAt || now;
    this.updatedAt = updatedAt || now;
  }

  @action
  updateTitle(title: string) {
    const now = Date.now();
    this.title = title;
    this.updatedAt = now;
  }

  @action
  toggleCompleted() {
    const now = Date.now();
    this.completed = !this.completed;
    this.updatedAt = now;
  }

  @action completeTodo() {
    const now = Date.now();
    if (!this.completed) {
      this.completed = true;
      this.updatedAt = now;
    }
  }

  static fromJS(todo: ITodoItem) {
    return new TodoItem(
      todo.title,
      todo.completed,
      todo.uuid,
      todo.createdAt,
      todo.updatedAt
    );
  }

  toJS(): ITodoItem {
    return {
      title: this.title,
      completed: this.completed,
      uuid: this.uuid,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }
  }
}