import { Container } from "inversify";
import ITodoRepository from "../../../../core/repository/ITodoRepository"
import TodoStore from "../../../../core/store/todoStore";
import AppViewModel, { IAppViewModel } from '../../../../presentation/AppViewModel';
import TodoFooterViewModel, { ITodoFooterViewModel } from "../../../../presentation/TodoFooterViewModel";
import TodoInputViewModel, { ITodoInputViewModel } from "../../../../presentation/TodoInputViewModel";
import TodoListViewModel, { ITodoListViewModel } from "../../../../presentation/TodoListViewModel";
import { TYPES } from "../../../../types";
import repository from "./repository";

const container = new Container();
container.bind<ITodoRepository>(TYPES.TodoRepository).to(repository).inSingletonScope();
container.bind<TodoStore>(TYPES.TodoStore).to(TodoStore).inSingletonScope();
container.bind<IAppViewModel>(TYPES.AppViewModel).to(AppViewModel).inSingletonScope();
container.bind<ITodoListViewModel>(TYPES.TodoListViewModel).to(TodoListViewModel).inSingletonScope();
container.bind<ITodoInputViewModel>(TYPES.TodoInputViewModel).to(TodoInputViewModel).inSingletonScope();
container.bind<ITodoFooterViewModel>(TYPES.TodoFooterViewModel).to(TodoFooterViewModel).inSingletonScope();

export { container };
