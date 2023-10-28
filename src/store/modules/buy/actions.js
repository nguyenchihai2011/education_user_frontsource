export default {
  setIsBuyNow({ commit }, isBuyNow) {
    commit("setIsBuyNow", isBuyNow);
  },

  setCourseBuyNow({ commit }, courseBuyNow) {
    commit("setCourseBuyNow", courseBuyNow);
  }
};
