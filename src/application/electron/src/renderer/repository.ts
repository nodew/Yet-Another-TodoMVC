import { injectable } from "inversify";
import { ipcRenderer } from "electron";
import TodoItem, { ITodoItem } from "../../../../core/domain/TodoItem";

@injectable()
export default class TodoRepository implements ITodoRepository {
  public async getTodoList(): Promise<TodoItem[]> {
    const data: ITodoItem[] = await ipcRenderer.invoke("getAlltodo");
    return data.map(TodoItem.fromObject);
  }

  public async toggleTodoItem(todo: TodoItem): Promise<TodoItem> {
    todo.toggleCompleted();
    await this.updateTodo(todo);
    return todo;
  }

  public async updateTodoTitle(todo: TodoItem, title: string): Promise<TodoItem> {
    todo.updateTitle(title);
    await this.updateTodo(todo);
    return todo;
  }

  public async addTodo(title: string): Promise<TodoItem> {
    const todo = new TodoItem(title);
    this.updateTodo(todo);
    return todo;
  }

  public async deleteTodo(uuid: string): Promise<boolean> {
    await ipcRenderer.invoke("deleteTodo", uuid)
    return true;
  }

  public async removeAllCompletedItem(): Promise<TodoItem[]> {
    await ipcRenderer.invoke("deleteAllCompleted")
    return this.getTodoList();
  }

  public async completeTodoItem(todo: TodoItem): Promise<TodoItem> {
    todo.completeTodo();
    this.updateTodo(todo);
    return todo;
  }

  public async updateTodo(todo: ITodoItem) {
    return ipcRenderer.invoke("updateTodo", todo);
  }
}
