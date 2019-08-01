const state = {
  layout: [],
  isLock: true,
  dashboardId: null,
  isUpdate: false
};

const mutations = {
  setDashboardId(state, id) {
    state.dashboardId = id;
  },
  setLock(state, value) {
    state.isLock = value;
  },
  setUpdate(state, value) {
    state.isUpdate = value;
  },
  addLayout(state, obj) {
    state.layout.push({
      x: 0,
      y: 0,
      w: obj.width,
      h: obj.height,
      i: state.layout.length + 1,
      name: obj.name,
      config: obj.config,
      setting: obj.setting
    });
  },
  putLayout(state, obj) {
    state.layout.splice(obj.index, 1, {
      x: obj.x,
      y: obj.y,
      w: obj.w,
      h: obj.h,
      i: obj.i,
      name: obj.name,
      config: obj.config,
      setting: obj.setting
    });
  },
  updateLayout(state, array) {
    state.layout = array;
  },
  removeLayout(state, index) {
    state.layout.splice(index, 1);
  }
};

export default {
  namespaced: true,
  state,
  mutations
};
