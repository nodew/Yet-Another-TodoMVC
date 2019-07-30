import { inject, injectable } from 'inversify';
import { action, observable, runInAction } from 'mobx';
import TodoStore, { Filter } from '../core/store/todoStore';
import { TYPES } from '../types';

export interface ITodoInputViewModel {
  input: string;
  updateInput(input: string): void;
  addTodo(): void;
}

@injectable()
export default class TodoInputViewModel implements ITodoInputViewModel {

  @observable public input: string = "";
  @inject(TYPES.TodoStore) private todoStore!: TodoStore;

  @action
  public updateInput(input: string) {
    this.input = input;
  }

  @action
  public async addTodo() {
    if (!this.input) {
      return;
    }

    await this.todoStore.addTodo(this.input);

    this.updateInput("");

    if (this.todoStore.filter === Filter.COMPLETED) {
      this.todoStore.changeFilter(Filter.ALL);
    }
  }
}
