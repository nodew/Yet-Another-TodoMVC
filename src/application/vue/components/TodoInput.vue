<template>
  <input
    class="new-todo"
    v-model="viewModel.input"
    placeholder="What need to be done?"
    @change="$emit('handleInputChange', $event.target.value)"
    @keydown.enter="handelComplete"
  />
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component';
import { observer } from 'mobx-vue';
import { ITodoInputViewModel } from "../../../presentation/TodoInputViewModel";

@observer
@Component({
  props: {
    viewModel: {
      type: Object as () => ITodoInputViewModel
    }
  }
})
export default class TodoInput extends Vue {
  handleInputChange(value: string) {
    this.$props.viewModel.updateInput(value)
  }

  handelComplete() {
    this.$props.viewModel.addTodo();
  }
}

</script>
