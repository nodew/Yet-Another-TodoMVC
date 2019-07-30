import { inject, injectable } from 'inversify';
import { action, computed } from 'mobx';
import TodoStore from '../core/store/todoStore';
import { TYPES } from '../types';
import TodoFooterViewModel, { ITodoFooterViewModel } from './TodoFooterViewModel';
import TodoInputViewModel, { ITodoInputViewModel } from './TodoInputViewModel';
import TodoListViewModel, { ITodoListViewModel } from './TodoListViewModel';

export interface IAppViewModel {
  todoListViewModel: ITodoListViewModel;
  todoInputViewModel: ITodoInputViewModel;
  todoFooterViewModel: ITodoFooterViewModel;
  showToggleAllActive: boolean;
  toggleAll(): void;
}

@injectable()
export default class AppViewModel implements IAppViewModel {
  @inject(TYPES.TodoListViewModel)
  public todoListViewModel!: ITodoListViewModel;

  @inject(TYPES.TodoInputViewModel)
  public todoInputViewModel!: ITodoInputViewModel;

  @inject(TYPES.TodoFooterViewModel)
  public todoFooterViewModel!: ITodoFooterViewModel;

  @inject(TYPES.TodoStore)
  private todoStore!: TodoStore;

  @computed get showToggleAllActive() {
    return this.todoListViewModel.todoList.filter(todo => !todo.completed).length > 0;
  }

  @action
  public toggleAll() {
    this.todoListViewModel.todoList.forEach(item => {
      if (!item.completed) {
        this.todoStore.completeTodo(item);
      }
    });
  }
}
