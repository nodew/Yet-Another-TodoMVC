const TYPES = {
  TodoRepository: Symbol.for("TodoRepository"),
  TodoStore: Symbol.for("TodoStore"),
  // tslint:disable-next-line:object-literal-sort-keys
  AppViewModel: Symbol.for("AppViewModel"),
  TodoInputViewModel: Symbol.for("TodoInputViewModel"),
  TodoListViewModel: Symbol.for("TodoListViewModel"),
  TodoFooterViewModel: Symbol.for("TodoFooterViewModel"),
  TodoItemViewModel: Symbol.for("TodoItemViewModel")
}

export {
  TYPES
};
