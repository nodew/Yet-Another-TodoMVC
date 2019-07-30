import { inject, injectable } from 'inversify';
import { computed } from 'mobx';
import TodoStore, { Filter } from '../core/store/todoStore';
import { TYPES } from '../types';
import TodoItemViewModel, { ITodoItemViewModel } from './TodoItemViewModel';
import TodoItem from '../core/domain/TodoItem';


export interface ITodoListViewModel {
  todoList: TodoItem[];
  todoItemViewModels: ITodoItemViewModel[];
}

@injectable()
export default class TodoListViewModel implements ITodoListViewModel {
  @inject(TYPES.TodoStore)
  private todoStore!: TodoStore;

  @computed get todoList() {
    switch (this.todoStore.filter) {
      case Filter.ACTIVE:
        return this.todoStore.todoList.filter(todo => !todo.completed);
      case Filter.COMPLETED:
        return this.todoStore.todoList.filter(todo => todo.completed);
      case Filter.ALL:
        return this.todoStore.todoList;
      default:
        return [];
    }
  }

  @computed get todoItemViewModels() {
    return this.todoList.map(item => new TodoItemViewModel(item, this.todoStore))
  }
}
