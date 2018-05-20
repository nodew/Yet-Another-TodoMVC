import { observable, action, runInAction } from 'mobx';
import TodoItem from '../models/TodoItem';
import db from '../common/database';

class TodoStore {
  @observable public todos: TodoItem[];

  constructor() {
    this.todos = [];
    this.getTodosFromDB();
  }

  getTodosFromDB() {
    db.getAll().then(todos => {
      runInAction(() => {
        this.todos = todos.map((todo) => new TodoItem(
          todo.title,
          todo.completed,
          todo.uuid,
          todo.createdAt,
          todo.updatedAt
        ));
      });
    });
  }

  addTodo(title: string) {
    const newTodo = new TodoItem(title);
    db.set(newTodo.uuid, newTodo).then(() => {
      runInAction(() => {
        this.todos.push(newTodo);
      });
    });
  }

  deleteTodo(uuid: string) {
    db.delete(uuid).then(() => {
      runInAction(() => {
        this.todos = this.todos.filter(todo => todo.uuid !== uuid);
      });
    });
  }

  removeCompleted() {
    const completedTodos = this.todos.filter(todo => todo.completed);
    Promise.all(completedTodos.map(todo => db.delete(todo.uuid))).then(() => {
      runInAction(() => {
        this.todos = this.todos.filter(todo => !todo.completed);
      });
    });
  }

  @action
  toggleTodo(uuid: string) {
    const todo = this.todos.find(todo => todo.uuid === uuid);
    if (todo) {
      todo.toggleCompleted();
      db.set(uuid, todo);
    }
  }

  @action
  updateTodo(uuid: string, title: string) {
    const todo = this.todos.find(todo => todo.uuid === uuid);
    if (todo) {
      todo.updateTitle(title);
      db.set(uuid, todo);
    }
  }
}

export default new TodoStore();