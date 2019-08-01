import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import "./autoImport";
import {
  Modal,
  Button,
  Select,
  message,
  InputNumber,
  Input,
  Form,
  Collapse,
  Radio
} from "ant-design-vue";
import { inventory } from "./api";

Vue.config.productionTip = false;
Vue.use(Modal);
Vue.use(Button);
Vue.use(Select);
Vue.use(InputNumber);
Vue.use(Input);
Vue.use(Form);
Vue.use(Collapse);
Vue.use(Radio);

Vue.prototype.$message = message;
Vue.prototype.$inventory = inventory;

new Vue({
  el: "#app",
  store,
  render: h => h(App)
});
