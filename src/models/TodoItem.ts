import { observable, action } from 'mobx';

import uuidGenerator from '../utils/uuidGenerator';

export default class TodoItem {
  @observable title: string;
  @observable completed: boolean;
  @observable uuid: string;
  @observable createdAt: number;
  @observable updatedAt: number;

  constructor(title: string, completed: boolean = false) {
    const now = Date.now();
    this.title = title;
    this.completed = completed;
    this.uuid = uuidGenerator();
    this.createdAt = now;
    this.updatedAt = now;
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
}