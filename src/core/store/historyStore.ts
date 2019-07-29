import { observable, action } from 'mobx';
import { Location } from 'history';
import history from '../../common/history';

class HistroyStore {
  @observable public search: string;
  @observable public hash: string;
  @observable public path: string;

  constructor() {
    this.search = location.search;
    this.hash = location.hash;
    this.path = location.pathname;
  }

  @action
  update(location: Location) {
    this.search = location.search;
    this.hash = location.hash;
    this.path = location.pathname;
  }
}

const historyStore = new HistroyStore();

history.listen((location) => {
  historyStore.update(location);
});

export default historyStore;

