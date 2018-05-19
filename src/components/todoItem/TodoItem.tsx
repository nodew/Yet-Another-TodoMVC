import * as React from 'react';
import { observer } from 'mobx-react';
import classNames from 'classnames';
import { ITodoItemViewModel } from './TodoItemViewModel';
import IViewModel from '../../IViewModel';

@observer
export default class TodoItem extends React.Component<IViewModel<ITodoItemViewModel>> {
  handleEdit() {

  }

  handleDestroy = () => {
    this.props.vm.deleteTodo();
  }

  handleSubmit() {

  }

  handleChange() {

  }

  handleKeyDown() {

  }

  render() {
    const { vm } = this.props;
    const { completed, title } = vm.todoItem;
    return (
      <li className={classNames({
        completed,
        editing: vm.editing
      })}>
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={completed}
            onChange={() => vm.toggleTodo()}
          />
          <label onDoubleClick={this.handleEdit}>
            {title}
          </label>
          <button className="destroy" onClick={this.handleDestroy} />
        </div>
        <input
          ref="editField"
          className="edit"
          value={vm.editText}
          onBlur={this.handleSubmit}
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}
        />
      </li>
    );
  }
};
