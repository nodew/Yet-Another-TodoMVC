import { observer } from 'mobx-react';
import * as React from 'react';
import { ITodoListViewModel } from '../../../presentation/TodoListViewModel';
import { IViewFor } from '../IViewFor';
import TodoItem from './TodoItem';

@observer
export default class TodoList extends React.Component<IViewFor<ITodoListViewModel>> {
  public renderTodoList() {
    return this.props.viewModel.todoItemViewModels.map((todoViewModel) => (
      <TodoItem viewModel={todoViewModel} key={todoViewModel.todoItem.uuid} />
    ));
  }

  public render() {
    return (
      <div className="todo-list">
        {this.renderTodoList()}
      </div>
    );
  }
}
