export default {
  setToken({ commit }, token) {
    commit("setToken", token);
  },

  setUserId({ commit }, userId) {
    commit("setUserId", userId);
  },

  setRole({ commit }, role) {
    commit("setRole", role);
  },

  setAuth({ commit }, auth) {
    commit("setAuth", auth);
  },

  unsetAuth({ commit }) {
    commit("unsetAuth");
  }
};
