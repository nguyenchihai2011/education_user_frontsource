import _ from "lodash";

export default {
  isBuyNow: state => state.isBuyNow || localStorage.getItem("isBuyNow"),
  courseBuyNow: state => {
    return _.isEmpty(state.courseBuyNow)
      ? JSON.parse(localStorage.getItem("courseBuyNow"))
      : state.courseBuyNow;
  }
};
