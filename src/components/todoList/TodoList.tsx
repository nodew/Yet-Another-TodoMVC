import * as React from 'react';
import { observer } from 'mobx-react';
import TodoItem from '../todoItem/TodoItem';
import { ITodoListViewModel } from './TodoListViewModel';
import IViewModel from '../../IViewModel';

@observer
export default class TodoList extends React.Component<IViewModel<ITodoListViewModel>> {
  renderTodoList() {
    const { todoVms } = this.props.vm;
    return todoVms.map((todoVm) => (
      <TodoItem vm={todoVm} key={todoVm.todoItem.uuid} />
    ));
  }

  render() {
    return (
      <div className="todo-list">
        {this.renderTodoList()}
      </div>
    );
  }
}
