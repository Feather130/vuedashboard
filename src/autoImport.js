import Vue from 'vue';
import { camelCase } from 'lodash';

const requireComponent = require.context('./views', true, /.(vue|js)$/);

const componentList = [];
const componentAll = [];

requireComponent.keys().forEach((fileName) => {
  const componentConfig = requireComponent(fileName);
  const componentName = camelCase(fileName.split('/')[1]);
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
