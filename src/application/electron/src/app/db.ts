import * as sqlite3 from "sqlite3";
import { ITodoItem } from "../../../../core/domain/TodoItem";

export const db = new sqlite3.Database("db.sqlite");

export const runSqlAsync = (stmt: string) => {
  return new Promise<sqlite3.RunResult>((resolve, reject) => {
    db.run(stmt, [], (result: sqlite3.RunResult, err: Error) => {
      if (err) {
        return reject(err);
      }
      return resolve(result);
    })
  })
}

export const createTable = () => {
  return runSqlAsync(`
    CREATE TABLE IF NOT EXISTS todos (
      id INTEGER PRIMARY KEY AUTOINCREMENT
      uuid VARCHAR(40)
      title VARCHAR(255)
      completed BOOLEAN DEFAULT false
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TRIGGER IF NOT EXISTS todo_update_at
      AFTER UPDATE
      ON todos
    BEGIN
      UPDATE todos SET updated_at = CURRENT_TIMESTAMP WHERE id = old.id;
    END;
  `)
}

export const createTodo = async (todo: ITodoItem) => {
  await runSqlAsync (`
    INSERT INTO todos (uuid, title, completed) VALUES (${todo.uuid}, ${todo.title}, 0);
  `);

}

export const updateTodo = (todo: ITodoItem) => {
  return db.run(`
    UPDATE todos
    SET
      title=${todo.title}
      completed=${!!todo.completed}
    WHERE
      uuid = ${todo.uuid}
  `)
}

export const getTodo = (uuid: string) => {
  return new Promise<ITodoItem>((resolve, reject) => {
    return db.get(`
      SELECT (uuid, title, completed, created_at, updated_at)
      FROM todos
      WHERE
      uuid = ${uuid}`,
      (_: any, err: any, row: any[]) => {
        if (err) {
          return reject(err);
        }
        return resolve({
          uuid: row[0],
          title: row[1],
          completed: row[2],
          createdAt: row[3],
          updatedAt: row[4]
        })})})
}

export const getAllTodo = () => {
  return new Promise<ITodoItem[]>((resolve, reject) => {
    return db.all(
      "SELECT (uuid, title, completed, created_at, updated_at) FROM todos;",
      (err, rows) => {
        if (err) {
          return reject(err);
        }
        return resolve(rows.map(row => {
          return {
            uuid: row[0],
            title: row[1],
            completed: row[2],
            createdAt: row[3],
            updatedAt: row[4]
          }
        }))})})
}

export const deleteTodo = async (uuid: string) => {
  await runSqlAsync (`DELETE FROM todos WHERE uuid=${uuid};`);
}

export const deleteAllCompleted = async () => {
  await runSqlAsync (`DELETE FROM todos WHERE completed=1;`);
}
