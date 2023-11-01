<template>
  <v-container>
    <v-row>
      <v-col cols="3">
        <router-link :to="`/course/${courseId}`" class="d-block">
          <v-img width="200px" cover :src="courseImage"></v-img>
          <!-- <v-img class="mr-2 d-block" contain :src="courseImage" /> -->
        </router-link>
      </v-col>
      <v-col cols="6">
        <div class="font-weight-bold">{{ courseName }}</div>
        <div class="text-subtitle-1">{{ courseTitle }}</div>
        <div class="text-caption">{{ lectureName }}</div>
        <div class="d-flex mx-0">
          <v-rating
            :value="courseRatingAvg"
            color="amber"
            dense
            half-increments
            readonly
            size="12"
          ></v-rating>
          <div class="grey--text ml-1">
            {{ courseRatingAvg }} ({{ totalRatings }})
          </div>
        </div>
        <!-- <div class="text-caption">
          38 total mins <v-icon>mdi-circle-small</v-icon>7
          letures<v-icon>mdi-circle-small</v-icon>All Levels
        </div> -->
      </v-col>
      <v-col cols="3" v-if="showPrice">
        <div class="py-0 px-4 font-weight-bold">{{ coursePrice }} USD</div>
        <!-- <core-button
          class="mt-2 py-5 deep-purple lighten-2 white--text text-none"
        >
          <v-icon>mdi-cart-plus</v-icon>
          <div class="ml-2">Add to cart</div>
        </core-button> -->
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// import CoreButton from "@/components/core/CoreButton.vue";
export default {
  // components: {
  //   CoreButton
  // },

  methods: {
    navigateToCourse() {
      console.log("dawhdjh");
      this.$router.push("/course");
    }
  },
  props: {
    courseId: {
      type: Number
    },
    courseImage: {
      type: String
    },
    courseName: {
      type: String
    },
    courseTitle: {
      type: String
    },
    coursePrice: {
      type: Number
    },
    lectureName: {
      type: String
    },
    showPrice: {
      type: Boolean,
      default: true
    },
    courseRatingAvg: {
      type: Number
    },
    totalRatings: {
      type: Number
    }
  }
};
</script>
