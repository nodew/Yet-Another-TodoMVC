<template>
  <li :class="{ completed: viewModel.todoItem.completed, editing: viewModel.editing }">
    <div class="view">
      <input
        class="toggle"
        type="checkbox"
        :checked="viewModel.todoItem.completed"
        @change="toggleTodo"
      />
      <label @dblclick="handleEdit">
        {{viewModel.todoItem.title}}
      </label>
      <button class="destroy" @click="handleDestroy" />
    </div>
    <input
      class="edit"
      v-model="viewModel.editText"
      @blur="handleBlur"
      @change="$emit('handleChange', $event.target.value)"
      @keydown.enter="handleComplete"
    />
  </li>
</template>
<script lang="ts">
import Vue from 'vue'
import { observer } from 'mobx-vue';
import Component from 'vue-class-component';
import classnames from "classnames";
import { ITodoItemViewModel } from '../../../presentation/TodoItemViewModel';

@observer
@Component({
   props: {
    viewModel: {
      type: Object as () => ITodoItemViewModel
    }
  }
})
export default class TodoItem extends Vue {
  toggleTodo() {
    this.$props.viewModel.toggleTodo()
  }

  handleBlur() {
    this.$props.viewModel.updateTodo()
  }

  handleChange(value: string) {
    this.$props.viewModel.updateEditTxt(value);
  }

  handleComplete() {
    this.$props.viewModel.updateTodo();
  }

  handleDestroy() {
    this.$props.viewModel.deleteTodo();
  }

  handleEdit() {
    this.$props.viewModel.toggleEditing(true);
  }
}
</script>
