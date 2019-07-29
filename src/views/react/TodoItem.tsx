import * as React from 'react';
import { observer } from 'mobx-react';
import classNames from 'classnames';
import { ITodoItemViewModel } from '../../presentation/TodoItemViewModel';
import IViewModel from '../../presentation/IViewModel';

const ENTER_KEY = 13;

@observer
export default class TodoItem extends React.Component<IViewModel<ITodoItemViewModel>> {
  handleEdit = () => {
    this.props.vm.toggleEditing(true);
  }

  handleBlur = () => {
    this.props.vm.updateTodo();
  }

  handleDestroy = () => {
    this.props.vm.deleteTodo();
  }

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.props.vm.updateEditTxt(e.target.value)
  }

  handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode !== ENTER_KEY) {
      return;
    }
    e.preventDefault();
    this.props.vm.updateTodo();
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
          onBlur={this.handleBlur}
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}
        />
      </li>
    );
  }
};
