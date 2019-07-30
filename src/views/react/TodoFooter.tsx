import classNames from 'classnames';
import { observer } from 'mobx-react';
import * as React from 'react';
import { Filter } from '../../core/store/todoStore';
import { ITodoFooterViewModel } from '../../presentation/TodoFooterViewModel';
import { IViewFor } from './IViewFor';

@observer
export default class TodoFooter extends React.Component<IViewFor<ITodoFooterViewModel>> {
  public handleSelect = (e: React.MouseEvent<HTMLAnchorElement>, filter: Filter) => {
    e.preventDefault();
    this.props.viewModel.handleFilterChanged(filter);
  }

  public renderItem(filter: Filter, text: string) {
    const selected = this.props.viewModel.filter === filter;
    const clx = classNames({ selected });
    return (
      <li>
        <a onClick={(e) => this.handleSelect(e, filter)} className={clx} >
          {text}
        </a>
      </li>
    );
  }

  public renderClearBtn() {
    if (this.props.viewModel.showClearBtn) {
      return (
        <button
          className="clear-completed"
          onClick={() => this.props.viewModel.clearCompleted()}
        >
          Clear completed
        </button>
      )
    }
    return null;
  }

  public render() {
    return (
      <footer className="footer">
          <span className="todo-count">
            <strong>{this.props.viewModel.count}</strong> item{this.props.viewModel.count > 1 ? 's': ''}
          </span>
          <ul className="filters">
            {this.renderItem(Filter.ALL, 'All')}
            {this.renderItem(Filter.ACTIVE, 'Active')}
            {this.renderItem(Filter.COMPLETED, 'Completed')}
          </ul>
          {this.renderClearBtn()}
        </footer>
    )
  }
}
