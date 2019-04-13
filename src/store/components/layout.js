const state = {
  layout: [],
  isLock: true,
  dashboardId: null
};

const mutations = {
  setDashboardId(state, id) {
    state.dashboardId = id;
  },
  setLock(state, value) {
    state.isLock = value;
  },
  addLayout(state, name) {
    state.layout.push({
      x: 0,
      y: 0,
      w: 10,
      h: 2,
      i: state.layout.length + 1,
      name
    });
  },
  delLayout(state, index) {
    state.layout.splice(index, 1);
  }
};

export default {
  namespaced: true,
  state,
  mutations
};
