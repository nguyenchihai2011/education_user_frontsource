<template>
  <div>
    <v-fade-transition mode="out-in">
      <router-view />
    </v-fade-transition>
    <core-snackbar></core-snackbar>
  </div>
</template>

<script>
import CoreSnackbar from "@/components/core/CoreSnackbar.vue";
import alanBtn from "@alan-ai/alan-sdk-web";
import { mapActions } from "vuex";

import "@/styles/overrides.sass";
export default {
  components: { CoreSnackbar },
  methods: {
    ...mapActions("alanAI", ["setCommand", "setValue"])
  },
  created() {
    alanBtn({
      key:
        "dcf6ffded2e0e10e9a01b45609aacfdd2e956eca572e1d8b807a3e2338fdd0dc/stage",
      onCommand: commandData => {
        if (commandData.command.COMMAND === "name") {
          // alert(commandData.command.value);
        } else if (commandData.command.COMMAND === "navigateDashboard") {
          this.$router.push("/");
        } else if (commandData.command.COMMAND === "search") {
          this.setCommand("search");
          this.setValue(commandData.command.value);
        }
      }
    });
  }
};
</script>
