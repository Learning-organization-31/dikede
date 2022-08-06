
const state = {
  sidebar: {
    opened: true,
    withoutAnimation: false,
  },
  device: "desktop",
};

const mutations = {

};

const actions = {
  closeSideBar({ commit }, { withoutAnimation }) {
  },
  toggleDevice({ commit }, device) {
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
