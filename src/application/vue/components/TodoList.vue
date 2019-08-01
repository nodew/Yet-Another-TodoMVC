<template>
  <div class="todo-list">
    <todo-item
      v-for="vm in viewModel.todoItemViewModels"
      :key="vm.todoItem.uuid"
      :viewModel="vm"
    ></todo-item>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Observer } from 'mobx-vue';
import Component from 'vue-class-component';
import TodoItem from './TodoItem.vue';
import { ITodoListViewModel } from '../../../presentation/TodoListViewModel';

@Observer
@Component({
  components: {
    "todo-item": TodoItem
  },
  props: {
    viewModel: {
      type: Object as () => ITodoListViewModel
    }
  }
})
export default class TodoList extends Vue {

}
</script>
