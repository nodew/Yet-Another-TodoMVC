import { observable, action, computed } from 'mobx';
import TodoListViewModel, { ITodoListViewModel } from './TodoListViewModel';
import TodoInputViewModel, { ITodoInputViewModel } from './TodoInputViewModel';
import TodoFooterViewModel, { ITodoFooterViewModel } from './TodoFooterViewModel';
import historyStore from '../core/store/historyStore';
import todoStore from '../core/store/todoStore';
import db from '../common/database';

export interface IAppViewModel {
  todoListVm: ITodoListViewModel;
  todoInputVm: ITodoInputViewModel;
  todoFooterVm: ITodoFooterViewModel;
  selected: 'ALL' | 'ACTIVE' | 'COMPLETED';
  toggleAllActive: boolean;
  toggleAll(): void;
}


export default class AppViewModel implements IAppViewModel {
  todoListVm: TodoListViewModel;
  todoInputVm: TodoInputViewModel;
  todoFooterVm: TodoFooterViewModel;

  constructor() {
    const todoListVm = new TodoListViewModel(this);
    this.todoListVm = todoListVm;
    this.todoInputVm = new TodoInputViewModel();
    this.todoFooterVm = new TodoFooterViewModel(todoListVm, this);
  }

  @computed get selected() {
    const hash = historyStore.hash;
    switch (hash) {
      case '#/completed':
        return 'COMPLETED';
      case '#/active':
        return 'ACTIVE';
      default:
        return 'ALL'
    }
  }

  @computed get toggleAllActive() {
    return this.todoListVm.todos.filter(todo => !todo.completed).length > 0;
  }

  @action
  toggleAll() {
    this.todoListVm.todos.forEach(todo => {
      db.get(todo.uuid).then(data => {
        if (!data.completed) {
          data.completed = true;
          db.set(data.uuid, data);
          todo.completeTodo();
        }
      });
    });
  }
}
