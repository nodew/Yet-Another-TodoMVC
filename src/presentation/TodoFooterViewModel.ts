import { inject, injectable } from 'inversify';
import { action, computed } from 'mobx';
import TodoStore, { Filter } from '../core/store/todoStore';
import { TYPES } from '../types';
import { ITodoListViewModel } from './TodoListViewModel';

export interface ITodoFooterViewModel {
  filter: Filter;
  count: number;
  showClearBtn: boolean;
  handleFilterChanged(filter: Filter): void;
  clearCompleted(): void;
}

@injectable()
export default class TodoFooterViewModel implements ITodoFooterViewModel {
  @inject(TYPES.TodoStore)
  private todoStore!: TodoStore;

  @inject(TYPES.TodoListViewModel)
  private todoListViewModel!: ITodoListViewModel;

  @computed get filter() {
    return this.todoStore.filter;
  }

  @computed get count() {
    return this.todoListViewModel.todoList.length;;
  }

  @computed get showClearBtn() {
    return this.todoStore.todoList.filter(todo => todo.completed).length > 0;
  }

  @action
  public handleFilterChanged(filter: Filter) {
    this.todoStore.changeFilter(filter);
  }

  @action
  public clearCompleted() {
    this.todoStore.removeCompleted();
  }
}
