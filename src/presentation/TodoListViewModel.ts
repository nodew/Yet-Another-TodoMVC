import { observable, action, computed } from 'mobx';
import TodoItemViewModel, { ITodoItemViewModel } from './TodoItemViewModel';
import { IAppViewModel } from './AppViewModel';
import todoStore from '../core/store/todoStore';
import TodoItem from '../core/domain/TodoItem';

export interface ITodoListViewModel {
  appVm: IAppViewModel;
  todos: TodoItem[];
  todoVms: ITodoItemViewModel[];
}

export default class TodoListViewModel implements ITodoListViewModel {
  appVm: IAppViewModel;

  constructor(appVm: IAppViewModel) {
    this.appVm = appVm;
  }

  @computed get selected() {
    return this.appVm.selected;
  }

  @computed get todos() {
    switch (this.selected) {
      case 'ACTIVE':
        return todoStore.todos.filter(todo => !todo.completed);
      case 'COMPLETED':
        return todoStore.todos.filter(todo => todo.completed);
      default:
        return todoStore.todos;
    }
  }

  @computed get todoVms() {
    return this.todos
      .sort((a, b) => b.createdAt - a.createdAt)
      .map((todo) => new TodoItemViewModel(todo));
  }
}
