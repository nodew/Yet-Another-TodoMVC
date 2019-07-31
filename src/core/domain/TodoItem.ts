import { action, observable } from 'mobx';
import uuidGenerator from '../../utils/uuidGenerator';

export interface ITodoItem {
  title: string;
  completed: boolean;
  uuid: string;
  createdAt: number;
  updatedAt: number;
}

export default class TodoItem implements ITodoItem {

  public static fromObject(todo: ITodoItem) {
    return new TodoItem(
      todo.title,
      todo.completed,
      todo.uuid,
      todo.createdAt,
      todo.updatedAt
    );
  }
  @observable public title: string;
  @observable public completed: boolean;
  @observable public uuid: string;
  @observable public createdAt: number;
  @observable public updatedAt: number;

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
  public updateTitle(title: string) {
    const now = Date.now();
    this.title = title;
    this.updatedAt = now;
  }

  @action
  public toggleCompleted() {
    const now = Date.now();
    this.completed = !this.completed;
    this.updatedAt = now;
  }

  @action
  public completeTodo() {
    const now = Date.now();
    if (!this.completed) {
      this.completed = true;
      this.updatedAt = now;
    }
  }
}
