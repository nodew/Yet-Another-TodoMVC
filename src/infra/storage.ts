import idb from 'idb';

const dbPromise = idb.open("todo-db", 1, upgradeDB => {
  upgradeDB.createObjectStore("todo");
});

const todoStore = {
  async get(key: string) {
    const db = await dbPromise;
    return db
      .transaction("todo")
      .objectStore("todo")
      .get(key);
  },
  async getAll() {
    const db = await dbPromise;
    return db
      .transaction("todo")
      .objectStore("todo")
      .getAll();
  },
  async set(key: string, val: any) {
    const db = await dbPromise;
    const tx = db.transaction("todo", "readwrite");
    tx.objectStore("todo").put(val, key);
    return tx.complete;
  },
  async delete(key: string) {
    const db = await dbPromise;
    const tx = db.transaction("todo", "readwrite");
    tx.objectStore("todo").delete(key);
    return tx.complete;
  },
  async clear() {
    const db = await dbPromise;
    const tx = db.transaction("todo", "readwrite");
    tx.objectStore("todo").clear();
    return tx.complete;
  },
};

export default todoStore;
