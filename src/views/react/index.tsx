import * as React from 'react';
import { render } from 'react-dom';
import "reflect-metadata";

import AppViewModel, { IAppViewModel } from '../../presentation/AppViewModel';
import TodoFooterViewModel, { ITodoFooterViewModel } from "../../presentation/TodoFooterViewModel";
import TodoInputViewModel, { ITodoInputViewModel } from "../../presentation/TodoInputViewModel";
import TodoListViewModel, { ITodoListViewModel } from "../../presentation/TodoListViewModel";
import App from './App';

import { container } from "../../inversify.config";
import TodoItemViewModel, { ITodoItemViewModel } from "../../presentation/TodoItemViewModel";
import { TYPES } from "../../types";

container.bind<IAppViewModel>(TYPES.AppViewModel).to(AppViewModel).inSingletonScope();
container.bind<ITodoListViewModel>(TYPES.TodoListViewModel).to(TodoListViewModel).inSingletonScope();
container.bind<ITodoInputViewModel>(TYPES.TodoInputViewModel).to(TodoInputViewModel).inSingletonScope();
container.bind<ITodoFooterViewModel>(TYPES.TodoFooterViewModel).to(TodoFooterViewModel).inSingletonScope();

const mountNode = document.querySelector('#app');
const appViewModel = container.get<IAppViewModel>(TYPES.AppViewModel);

render(<App viewModel={appViewModel} />, mountNode);
