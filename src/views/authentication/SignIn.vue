<template>
  <v-container>
    <v-row class="justify-center">
      <v-col cols="5">
        <div class="text-h6 font-weight-bold d-flex justify-center">
          Log in to your Open Education account
        </div>
        <v-text-field
          v-model="username"
          outlined
          placeholder="Username"
          color="#000"
          height="38"
          hide-details
          class="mt-4"
        ></v-text-field>
        <v-text-field
          v-model="password"
          outlined
          placeholder="Password"
          color="#000"
          height="38"
          hide-details
          class="mt-4"
        ></v-text-field>
        <v-btn
          class="purple lighten-2 white--text text-none mt-4"
          height="48"
          width="100%"
          @click="signIn()"
        >
          Log in
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { signIn, getUserInfo } from "@/api/auth";
import { mapGetters, mapActions } from "vuex";

export default {
  components: {},
  data() {
    return {
      username: "",
      password: ""
    };
  },
  computed: {
    ...mapGetters("auth", ["token", "userId", "role"])
  },
  methods: {
    ...mapActions("auth", ["setToken", "setUserId", "setRole", "setAuth"]),
    signIn() {
      const payload = {
        username: this.username,
        password: this.password
      };
      signIn(payload)
        .then(res => {
          this.setToken(res.data.token);
          this.setUserId(res.data.userId);
          this.setRole(res.data.role);

          getUserInfo({ userId: this.userId, role: this.role }).then(res => {
            console.log(res.data);
            // this.setAuth(res.data);
            this.$router.push("/");
          });
        })
        .catch(err => console.log(err));
    }
  }
};
</script>
