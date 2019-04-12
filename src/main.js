import Vue from 'vue';
import App from './App.vue';
import store from './store';
import './autoImport';
import { Modal, Button, Select, message } from 'ant-design-vue';
import { inventory } from './api/inventory';

Vue.config.productionTip = false;
Vue.use(Modal);
Vue.use(Button);
Vue.use(Select);

Vue.prototype.$message = message;
Vue.prototype.$inventory = inventory;

new Vue({
  el: '#app',
  store,
  render: (h) => h(App),
});
