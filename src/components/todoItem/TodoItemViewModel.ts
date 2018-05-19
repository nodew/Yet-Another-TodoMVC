import { observable, action } from 'mobx';
import TodoItem from '../../models/TodoItem';
import todoStore from '../../store/todoStore';

export interface ITodoItemViewModel {
  todoItem: TodoItem
  editing: boolean;
  editText: string;
  toggleTodo(): void;
  deleteTodo(): void;
}

export default class TodoItemViewModel implements ITodoItemViewModel {
  @observable public todoItem: TodoItem;
  @observable public editing: boolean;
  @observable public editText: string;

  constructor(todoItem: TodoItem) {
    this.todoItem = todoItem;
    this.editing = false;
    this.editText = todoItem.title;
  }

  @action
  toggleTodo() {
    todoStore.toggleTodo(this.todoItem.uuid);
  }

  @action
  deleteTodo() {
    todoStore.deleteTodo(this.todoItem.uuid);
  }
}