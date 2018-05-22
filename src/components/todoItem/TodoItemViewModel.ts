import { observable, action } from 'mobx';
import TodoItem, { ITodoItem } from '../../models/TodoItem';
import todoStore from '../../store/todoStore';
import db from '../../common/database';
import history from '../../common/history';

export interface ITodoItemViewModel {
  todoItem: TodoItem
  editing: boolean;
  editText: string;
  toggleTodo(): void;
  deleteTodo(): void;
  toggleEditing(status: boolean): void;
  updateEditTxt(input: string): void;
  updateTodo(): void;
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
    db.get(this.todoItem.uuid).then(todo => {
      if (todo) {
        todo.completed = !todo.completed;
        db.set(this.todoItem.uuid, todo);
        this.todoItem.toggleCompleted();
      }
    })
  }

  @action
  deleteTodo() {
    todoStore.deleteTodo(this.todoItem.uuid);
  }

  @action
  toggleEditing(status: boolean) {
    this.editing = status;
  }

  @action
  updateEditTxt(input: string) {
    this.editText = input;
  }

  @action
  updateTodo() {
    this.toggleEditing(false);
    db.get(this.todoItem.uuid).then(todo => {
      if (todo) {
        todo.title = this.editText;
        db.set(this.todoItem.uuid, todo);
        this.todoItem.updateTitle(this.editText);
      }
    });
  }
}