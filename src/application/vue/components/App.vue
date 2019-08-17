<template>
  <div class="todoapp">
    <header>
      <h1>todo list</h1>
      <todo-input :viewModel="viewModel.todoInputViewModel"></todo-input>
      <input
        id="toggle-all"
        class="toggle-all"
        type="checkbox"
        @change="toggleAll"
        :checked="viewModel.showToggleAllActive"
      />
      <label
        for="toggle-all"
      ></label>
    </header>
    <div class="main">
      <todo-list :viewModel="viewModel.todoListViewModel"></todo-list>
      <todo-footer :viewModel="viewModel.todoFooterViewModel"></todo-footer>
    </div>
  </div>
</template>

<script lang="ts">
import { container } from "../inversify.config";
import Vue from 'vue';
import Component from "vue-class-component";
import TodoInput from "./TodoInput.vue";
import TodoList from "./TodoList.vue";
import TodoFooter from "./TodoFooter.vue";
import { TYPES } from '../../../types';
import { IAppViewModel } from '../../../presentation/AppViewModel';
import { observer } from 'mobx-vue';

const appViewModel = container.get<IAppViewModel>(TYPES.AppViewModel);

console.log(appViewModel);

@observer
@Component({
  components: {
    "todo-input": TodoInput,
    "todo-list": TodoList,
    "todo-footer": TodoFooter
  }
})
export default class App extends Vue {

  private viewModel: IAppViewModel = appViewModel

  toggleAll() {
    this.viewModel.toggleAll();
  }
}
</script>

