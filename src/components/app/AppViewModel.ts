import { observable, action, computed } from 'mobx';
import TodoListViewModel, { ITodoListViewModel } from '../todoList/TodoListViewModel';
import TodoInputViewModel, { ITodoInputViewModel } from '../todoInput/TodoInputViewModel';
import TodoFooterViewModel, { ITodoFooterViewModel } from '../todoFooter/TodoFooterViewModel';
import historyStore from '../../store/historyStore';
import todoStore from '../../store/todoStore';

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
      todo.completeTodo();
    });
  }
}