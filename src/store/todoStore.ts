import { observable, action } from 'mobx';
import TodoItem from '../models/TodoItem';

class TodoStore {
  @observable todos: TodoItem[];

  constructor() {
    this.todos = [];
  }

  @action
  addTodo(title: string) {
    this.todos.push(new TodoItem(title));
  }

  @action
  deleteTodo(uuid: string) {
    this.todos = this.todos.filter(todo => todo.uuid !== uuid);
  }

  @action
  removeCompleted() {
    this.todos = this.todos.filter(todo => !todo.completed);
  }

  @action
  toggleTodo(uuid: string) {
    const todo = this.todos.find(todo => todo.uuid === uuid);
    if (todo) {
      todo.toggleCompleted();
    }
  }
}

export default new TodoStore();