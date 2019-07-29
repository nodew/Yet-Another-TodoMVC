import * as React from 'react';
import { observer } from 'mobx-react';
import classNames from 'classnames';
import { ITodoFooterViewModel } from '../../presentation/TodoFooterViewModel';
import IViewModel from '../../presentation/IViewModel';
import history from '../../common/history';

@observer
export default class TodoFooter extends React.Component<IViewModel<ITodoFooterViewModel>> {
  handleSelect = (e: React.MouseEvent<HTMLAnchorElement>, url: string) => {
    e.preventDefault();
    history.push(url);
  }

  renderItem(url: string, type: string, text: string) {
    const { vm } = this.props;
    const selected = vm.selected === type;
    const clx = classNames({ selected });
    return (
      <li>
        <a onClick={(e) => this.handleSelect(e, url)} className={clx} >
          {text}
        </a>
      </li>
    );
  }

  renderClearBtn() {
    const { vm } = this.props;
    if (vm.showClearBtn) {
      return (
        <button
          className="clear-completed"
          onClick={() => vm.clearCompleted()}
        >
          Clear completed
        </button>
      )
    }
    return null;
  }

  render() {
    const { vm } = this.props;
    return (
      <footer className="footer">
          <span className="todo-count">
            <strong>{vm.count}</strong> item{vm.count > 1 ? 's': ''}
          </span>
          <ul className="filters">
            {this.renderItem('#/', 'ALL', 'All')}
            {this.renderItem('#/active', 'ACTIVE', 'Active')}
            {this.renderItem('#/completed', 'COMPLETED', 'Completed')}
          </ul>
          {this.renderClearBtn()}
        </footer>
    )
  }
}
