import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

import colors from "vuetify/lib/util/colors";

Vue.use(Vuetify);

export default new Vuetify({
  breakpoint: {
    mobileBreakpoint: "sm"
  },
  icons: {
    iconfont: "mdiSvg" // 'mdi' || 'mdiSvg' || 'md' || 'fa' || 'fa4' || 'faSvg'
  },

  theme: {
    themes: {
      light: {
        primary: colors.lightBlue,
        secondary: colors.grey.darken1,
        accent: colors.pink.darken1,
        error: colors.red.accent3,
        background: colors.indigo.lighten5,
        info: colors.teal.darken1
      },
      dark: {
        primary: colors.blue.darken4,
        background: colors.indigo.base,
        info: colors.teal.lighten1
      }
    }
  }
});
