import { observer } from 'mobx-react';
import * as React from 'react';
import { IAppViewModel } from '../../../presentation/AppViewModel';
import { IViewFor } from '../IViewFor';
import TodoFooter from './TodoFooter';
import TodoInput from './TodoInput';
import TodoList from './TodoList';

@observer
export default class App extends React.Component<IViewFor<IAppViewModel>> {
  public toggleAll = () => {
    this.props.viewModel.toggleAll();
  }

  public render() {
    return (
      <div className="todoapp">
        <header>
          <h1>todo list</h1>
          <TodoInput viewModel={this.props.viewModel.todoInputViewModel} />
          <input
            id="toggle-all"
            className="toggle-all"
            type="checkbox"
            onChange={this.toggleAll}
            checked={this.props.viewModel.showToggleAllActive}
          />
          <label
            htmlFor="toggle-all"
          />
        </header>
        <div className="main">
          <TodoList viewModel={this.props.viewModel.todoListViewModel} />
          <TodoFooter viewModel={this.props.viewModel.todoFooterViewModel} />
        </div>
      </div>
    );
  }
}
