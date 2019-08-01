<template>
  <li :class="className">
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
import { Observer } from 'mobx-vue';
import Component from 'vue-class-component';
import classnames from "classnames";
import { ITodoItemViewModel } from '../../../presentation/TodoItemViewModel';

@Observer
@Component({
   props: {
    viewModel: {
      type: Object as () => ITodoItemViewModel
    }
  }
})
export default class TodoItem extends Vue {
  get className() {
    return classnames({
        completed: this.$props.viewModel.completed,
        editing: this.$props.viewModel.editing
    })
  }

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
