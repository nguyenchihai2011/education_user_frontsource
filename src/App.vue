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

import "@/styles/overrides.sass";
export default {
  components: { CoreSnackbar }
};
</script>
