import { injectable } from "inversify";
import TodoItem from "../../core/domain/TodoItem";
import ITodoRepository from "../../core/repository/ITodoRepository";
import storage from "../storage";

@injectable()
export default class TodoRepository implements ITodoRepository {
  public async getTodoList(): Promise<TodoItem[]> {
    const data = await storage.getAll();
    return data.map(TodoItem.fromObject);
  }

  public async toggleTodoItem(todo: TodoItem): Promise<TodoItem> {
    todo.toggleCompleted();
    await storage.set(todo.uuid, todo);
    return todo;
  }

  public async updateTodoTitle(todo: TodoItem, title: string): Promise<TodoItem> {
    todo.updateTitle(title);
    await storage.set(todo.uuid, todo);
    return todo;
  }

  public async addTodo(title: string): Promise<TodoItem> {
    const todo = new TodoItem(title);
    await storage.set(todo.uuid, todo);
    return todo;
  }

  public async deleteTodo(uuid: string): Promise<boolean> {
    await storage.delete(uuid);
    return true;
  }

  public async removeAllCompletedItem(): Promise<TodoItem[]> {
    const todoList = await this.getTodoList();
    todoList.forEach(async todo => {
      if (todo.completed) {
        await this.deleteTodo(todo.uuid);
      }
    });
    return this.getTodoList();
  }

  public async completeTodoItem(todo: TodoItem): Promise<TodoItem> {
    todo.completeTodo();
    await storage.set(todo.uuid, todo);
    return todo;
  }
}
