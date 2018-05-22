import { observable, action, computed } from 'mobx';
import { ITodoListViewModel } from '../todoList/TodoListViewModel';
import { IAppViewModel } from '../app/AppViewModel';
import historyStore from '../../store/historyStore';
import todoStore from '../../store/todoStore';

export interface ITodoFooterViewModel {
  selected: 'ALL' | 'ACTIVE' | 'COMPLETED';
  todoListVm: ITodoListViewModel;
  count: number;
  showClearBtn: boolean;
  clearCompleted(): void;
}

export default class TodoFooterViewModel implements ITodoFooterViewModel {
  todoListVm: ITodoListViewModel;
  appVm: IAppViewModel;

  constructor(
    todoListVm: ITodoListViewModel,
    appVm: IAppViewModel
  ) {
    this.todoListVm = todoListVm;
    this.appVm = appVm;
  }

  @computed get selected() {
    return this.appVm.selected;
  }

  @computed get count() {
    return this.todoListVm.todos.length;
  }

  @computed get showClearBtn() {
    return todoStore.todos.filter(todo => todo.completed).length > 0;
  }

  clearCompleted() {
    todoStore.removeCompleted();
  }
}