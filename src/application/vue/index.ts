import "reflect-metadata";
import Vue from 'vue';
import App from './components/App.vue';

// tslint:disable no-unused-expression
new Vue({
  el: '#app',
  render: h => h(App)
});
