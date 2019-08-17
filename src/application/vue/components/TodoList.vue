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
import { observer } from 'mobx-vue';
import Component from 'vue-class-component';
import TodoItem from './TodoItem.vue';
import { ITodoListViewModel } from '../../../presentation/TodoListViewModel';

@observer
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
