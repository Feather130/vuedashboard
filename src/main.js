import Vue from "vue";
import App from "./App.vue";
import { camelCase } from "lodash";
import { Modal, Button, Select, message } from "ant-design-vue";
import { inventory } from "./api/inventory";

Vue.config.productionTip = false;
Vue.use(Modal);
Vue.use(Button);
Vue.use(Select);

Vue.prototype.$message = message;
Vue.prototype.$inventory = inventory;

const requireComponent = require.context("./views", true, /.(vue|js)$/);

const componentList = [];
const componentAll = [];

requireComponent.keys().forEach(fileName => {
  const componentConfig = requireComponent(fileName);
  const componentName = camelCase(fileName.split("/")[1]);
  if (componentList.indexOf(componentName) === -1) {
    componentList.push(componentName);
  }
  componentAll.push(componentConfig.default.name);
  Vue.component(
    componentConfig.default.name,
    componentConfig.default || componentConfig
  );
});
window.componentList = componentList;
window.componentAll = componentAll;

new Vue({
  el: "#app",
  render: h => h(App)
});
