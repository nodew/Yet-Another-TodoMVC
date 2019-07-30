import TodoItem, { ITodoItem } from "../domain/TodoItem";

export default interface ITodoRepository {
  getTodoList(): Promise<TodoItem[]>;
  toggleTodoItem(todo: TodoItem): Promise<TodoItem>;
  completeTodoItem(todo: TodoItem): Promise<TodoItem>;
  updateTodoTitle(todo: TodoItem, title: string): Promise<TodoItem>;
  addTodo(title: string): Promise<TodoItem>;
  deleteTodo(uuid: string): Promise<boolean>;
  removeAllCompletedItem(): Promise<TodoItem[]>;
}
