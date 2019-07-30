import { inject, injectable } from "inversify";
import { action, observable, runInAction } from 'mobx';
import { TYPES } from '../../types';
import TodoItem from '../domain/TodoItem';
import ITodoRepository from '../repository/ITodoRepository';
import { ObservableArray } from "mobx/lib/internal";

export enum Filter {
  ALL = "ALL",
  ACTIVE = "ACTIVE",
  COMPLETED = "COMPLETED"
}

@injectable()
class TodoStore {
  private todoRepository: ITodoRepository;

  @observable public todoList: TodoItem[];
  @observable public filter: Filter;

  constructor(
    @inject(TYPES.TodoRepository) todoRepository: ITodoRepository
  ) {
    this.todoRepository = todoRepository;
    this.todoList = [];
    this.filter = Filter.ALL;
    this.init();
  }

  @action
  public async init() {
    const todoList = await this.todoRepository.getTodoList();
    runInAction(() => {
      this.todoList = todoList;
    });
  }

  @action
  public async addTodo(title: string) {
    const todo = await this.todoRepository.addTodo(title);
    runInAction(() => {
      this.todoList.unshift(todo);
    });
  }

  @action
  public async updateTitle(item: TodoItem, title: string) {
    await this.todoRepository.updateTodoTitle(item, title);
  }

  @action
  public async completeTodo(item: TodoItem) {
    await this.todoRepository.toggleTodoItem(item);
  }

  @action
  public async toggleTodo(item: TodoItem) {
    await this.todoRepository.toggleTodoItem(item);
  }

  @action
  public async deleteTodo(uuid: string) {
    await this.todoRepository.deleteTodo(uuid);
    runInAction(() => {
      this.todoList = this.todoList.filter(item => item.uuid !== uuid)
    })
  }

  @action
  public async removeCompleted() {
    const todoList = await this.todoRepository.removeAllCompletedItem();
    runInAction(() => {
      this.todoList = todoList;
    });
  }

  @action
  public changeFilter(filter: Filter) {
    this.filter = filter;
  }
}

export default TodoStore;
