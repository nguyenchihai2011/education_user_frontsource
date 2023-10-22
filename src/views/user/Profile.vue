<template>
  <v-container fluid>
    <v-row no-gutters class="flex-column align-center my-8">
      <v-col cols="6" class="d-flex justify-space-between align-center mb-4">
        <div class="text-h3">Edit Profile</div>
        <div style="width: 200px">
          <v-avatar size="60" class="text-center">
            <v-icon size="60" v-if="!user.avatarUrl">
              mdi-account-circle
            </v-icon>
            <img v-else :src="user.avatarUrl" alt="John" />
          </v-avatar>
          <v-file-input
            v-model="fileAvatar"
            label="Take a photo"
            prepend-icon="mdi-camera"
            small-chips
          ></v-file-input>
        </div>
      </v-col>
      <v-col cols="6">
        <v-row no-gutters>
          <v-col cols="6" class="d-flex flex-column pr-4">
            <div>First Name</div>
            <v-text-field
              v-model="user.firstName"
              dense
              outlined
              class="rounded-lg"
            ></v-text-field>
          </v-col>
          <v-col cols="6" class="d-flex flex-column pl-4">
            <div>Last Name</div>
            <v-text-field
              v-model="user.lastName"
              dense
              outlined
              class="rounded-lg"
            ></v-text-field>
          </v-col>
          <v-col cols="12" class="d-flex flex-column">
            <div>Email</div>
            <v-text-field dense outlined class="rounded-lg"></v-text-field>
          </v-col>
          <v-col cols="12" class="d-flex flex-column">
            <div>Address</div>
            <v-text-field
              v-model="user.address"
              dense
              outlined
              class="rounded-lg"
            ></v-text-field>
          </v-col>
          <v-col cols="12" class="d-flex flex-column">
            <div>Phone Number</div>
            <v-text-field dense outlined class="rounded-lg"></v-text-field>
          </v-col>
          <v-col cols="12" class="d-flex justify-end">
            <core-button outlined class="primary--text">Cancel</core-button>
            <core-button
              class="ml-4 primary white--text"
              @click.native="submit()"
              >Save</core-button
            >
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";
import { getUserInfo } from "@/api/auth";
import CoreButton from "@/components/core/CoreButton.vue";

const cloudName = "drampapfw";
const uploadPreset = "education";

export default {
  components: {
    CoreButton
  },

  data() {
    return {
      user: {
        address: "",
        avatarUrl: "",
        firstName: "",
        lastName: ""
      },
      fileAvatar: null
    };
  },

  computed: {
    ...mapGetters("auth", ["userId", "role"])
  },

  methods: {
    fetchUserInfo() {
      const params = {
        userId: this.userId,
        role: this.role
      };
      getUserInfo(params).then(() => {
        this.user = res.data;
      });
    },
    changeProfile() {
      const payload = {
        ...this.user,
        userId: this.userId
      };
    },

    async submit() {
      const file = this.fileAvatar;
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", uploadPreset);

      try {
        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/${cloudName}/upload`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          }
        );
        this.user.avatarUrl = response.data.secure_url;
        this.changeProfile();
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  },

  created() {
    // this.fetchUserInfo();
  }
};
</script>
