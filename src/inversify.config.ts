import { Container } from "inversify";
import ITodoRepository from "./core/repository/ITodoRepository"
import TodoStore from "./core/store/todoStore";
import TodoRepository from "./infra/repository/TodoRepository";
import { TYPES } from "./types";

const container = new Container();
container.bind<ITodoRepository>(TYPES.TodoRepository).to(TodoRepository).inSingletonScope();
container.bind<TodoStore>(TYPES.TodoStore).to(TodoStore).inSingletonScope();

export { container };
