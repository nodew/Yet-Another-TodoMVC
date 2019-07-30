import classNames from 'classnames';
import { observer } from 'mobx-react';
import * as React from 'react';
import { ITodoItemViewModel } from '../../presentation/TodoItemViewModel';
import { IViewFor } from './IViewFor';

const ENTER_KEY = 13;

@observer
export default class TodoItem extends React.Component<IViewFor<ITodoItemViewModel>> {
  public handleEdit = () => {
    this.props.viewModel.toggleEditing(true);
  }

  public handleBlur = () => {
    this.props.viewModel.updateTodo();
  }

  public handleDestroy = () => {
    this.props.viewModel.deleteTodo();
  }

  public handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.props.viewModel.updateEditTxt(e.target.value)
  }

  public handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode !== ENTER_KEY) {
      return;
    }
    e.preventDefault();
    this.props.viewModel.updateTodo();
  }

  public render() {
    const { completed, title } = this.props.viewModel.todoItem;
    return (
      <li className={classNames({
        completed,
        editing: this.props.viewModel.editing
      })}>
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={completed}
            onChange={() => this.props.viewModel.toggleTodo()}
          />
          <label onDoubleClick={this.handleEdit}>
            {title}
          </label>
          <button className="destroy" onClick={this.handleDestroy} />
        </div>
        <input
          ref="editField"
          className="edit"
          value={this.props.viewModel.editText}
          onBlur={this.handleBlur}
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}
        />
      </li>
    );
  }
};
