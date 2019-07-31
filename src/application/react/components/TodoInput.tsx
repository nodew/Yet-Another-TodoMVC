import { observer } from 'mobx-react';
import * as React from 'react';
import { ITodoInputViewModel } from '../../../presentation/TodoInputViewModel';
import { IViewFor } from '../IViewFor';

const ENTER_KEY = 13;

@observer
export default class TodoInput extends React.Component<IViewFor<ITodoInputViewModel>> {
  public handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.props.viewModel.updateInput(e.target.value)
  }

  public handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode !== ENTER_KEY) {
      return;
    }
    e.preventDefault();
    this.props.viewModel.addTodo();
  }

  public render() {
    return (
      <input
        className="new-todo"
        value={this.props.viewModel.input}
        placeholder="What need to be done?"
        onChange={this.handleInputChange}
        onKeyDown={this.handleKeyDown}
      />
    );
  }
}
