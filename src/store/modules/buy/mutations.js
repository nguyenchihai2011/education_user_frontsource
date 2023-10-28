export default {
  setIsBuyNow(state, isBuyNow) {
    state.isBuyNow = isBuyNow;
    localStorage.setItem("isBuyNow", isBuyNow);
  },
  setCourseBuyNow(state, courseBuyNow) {
    state.courseBuyNow = courseBuyNow;
    localStorage.setItem("courseBuyNow", JSON.stringify(courseBuyNow));
  }
};
