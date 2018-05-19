import * as React from 'react';
import { observer } from 'mobx-react';
import { ITodoInputViewModel } from './TodoInputViewModel';
import IViewModel from '../../IViewModel';

const ENTER_KEY = 13;

@observer
export default class TodoInput extends React.Component<IViewModel<ITodoInputViewModel>> {
  handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.props.vm.updateInput(e.target.value)
  }

  handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode !== ENTER_KEY) {
      return;
    }
    e.preventDefault();
    this.props.vm.addTodo();
  }

  render() {
    const { vm } = this.props;
    return (
      <input
        className="new-todo"
        value={vm.input}
        placeholder="What need to be done?"
        onChange={this.handleInputChange}
        onKeyDown={this.handleKeyDown}
      />
    );
  }
}