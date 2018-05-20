import idb from 'idb';

const dbPromise = idb.open('todo-db', 1, upgradeDB => {
  upgradeDB.createObjectStore('todos');
});

const todoStore = {
  get(key: string) {
    return dbPromise.then(db => {
      return db.transaction('todos')
        .objectStore('todos').get(key);
    });
  },
  getAll() {
    return dbPromise.then(db => {
      return db.transaction('todos')
        .objectStore('todos').getAll();
    });
  },
  set(key: string, val: any) {
    return dbPromise.then(db => {
      const tx = db.transaction('todos', 'readwrite');
      tx.objectStore('todos').put(val, key);
      return tx.complete;
    });
  },
  delete(key: string) {
    return dbPromise.then(db => {
      const tx = db.transaction('todos', 'readwrite');
      tx.objectStore('todos').delete(key);
      return tx.complete;
    });
  },
  clear() {
    return dbPromise.then(db => {
      const tx = db.transaction('todos', 'readwrite');
      tx.objectStore('todos').clear();
      return tx.complete;
    });
  },
  keys() {
    return dbPromise.then(db => {
      const tx = db.transaction('todos');
      const keys: string[] = [];
      const store = tx.objectStore('todos');
      (store.iterateKeyCursor || store.iterateCursor).call(store, (cursor: any) => {
        if (!cursor) return;
        keys.push(cursor.key);
        cursor.continue();
      });

      return tx.complete.then(() => keys);
    });
  }
};

export default todoStore;
