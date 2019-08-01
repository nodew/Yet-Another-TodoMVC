<template>
  <footer class="footer">
    <span class="todo-count">
      <strong>{{viewModel.count}}</strong> item{{viewModel.count > 1 ? 's': ''}}
    </span>
    <ul class="filters">
      <li v-for="filter in filters" :key="filter.text" >
        <a @click="handleFilterChange(filter.value)" :class="{ selected: filter.value === viewModel.filter }" >
          {{filter.text}}
        </a>
      </li>
    </ul>
    <button
      class="clear-completed"
      @click="handleClearCompleted"
      v-show="viewModel.showClearBtn"
    >
      Clear completed
    </button>
  </footer>
</template>

<script lang="ts">
import Vue from 'vue'
import { Observer } from 'mobx-vue';
import Component from 'vue-class-component';
import { ITodoFooterViewModel } from '../../../presentation/TodoFooterViewModel';
import { Filter } from '../../../core/store/todoStore';

@Observer
@Component({
  props: {
    viewModel: {
      type: Object as () => ITodoFooterViewModel
    }
  }
})
export default class TodoFooter extends Vue {
  filters = [{
    value: Filter.ALL,
    text: "All"
  }, {
    value: Filter.ACTIVE,
    text: "Active",
  }, {
    value: Filter.COMPLETED,
    text: "Completed"
  }]

  handleFilterChange(filter: Filter) {
    this.$props.viewModel.handleFilterChanged(filter)
  }

  handleClearCompleted() {
    this.$props.viewModel.clearCompleted();
  }
}
</script>
