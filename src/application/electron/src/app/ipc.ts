
import { ipcMain, remote } from 'electron';
import { createTodo, deleteTodo, getAllTodo, getTodo, updateTodo, deleteAllCompleted } from './db';

export default () => {
  ipcMain.handle("getTodoList", async (event, args) => {
    const todoList = await getAllTodo();
    return todoList;
  });

  ipcMain.handle("getTodo", async (event, uuid) => {
    return getTodo(uuid)
  });

  ipcMain.handle("createTodo", async (event, todo) => {
    return createTodo(todo);
  });

  ipcMain.handle("updateTodo", async (event, todo) => {
    await updateTodo(todo);
    return getTodo(todo.uuid);
  });

  ipcMain.handle("deleteTodo", async (event, uuid) => {
    return deleteTodo(uuid);
  });

  ipcMain.handle("deleteAllCompleted", async (event) => {
    return deleteAllCompleted();
  });
}
