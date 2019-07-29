import * as React from 'react';
import { observer } from 'mobx-react';
import TodoList from './TodoList';
import TodoInput from './TodoInput';
import TodoFooter from './TodoFooter';
import { IAppViewModel } from '../../presentation/AppViewModel';
import IViewModel from '../../presentation/IViewModel';

@observer
export default class App extends React.Component<IViewModel<IAppViewModel>> {
  toggleAll = () => {
    this.props.vm.toggleAll();
  }

  render() {
    const { vm } = this.props;
    return (
      <div className="todoapp">
        <header>
          <h1>todos</h1>
          <TodoInput vm={vm.todoInputVm} />
          <input
            id="toggle-all"
            className="toggle-all"
            type="checkbox"
            onChange={this.toggleAll}
            checked={vm.toggleAllActive}
          />
          <label
            htmlFor="toggle-all"
          />
        </header>
        <div className="main">
          <TodoList vm={vm.todoListVm} />
          <TodoFooter vm={vm.todoFooterVm} />
        </div>
      </div>
    );
  }
}
