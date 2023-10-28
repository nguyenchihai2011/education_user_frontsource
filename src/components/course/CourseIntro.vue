<template>
  <v-card class="mx-auto" max-width="370">
    <template slot="progress">
      <v-progress-linear
        color="deep-purple"
        height="10"
        indeterminate
      ></v-progress-linear>
    </template>

    <v-img
      @click="$router.push(`/course/${courseId}`)"
      :src="courseImage"
    ></v-img>

    <v-card-title>{{ courseName }}</v-card-title>
    <v-card-subtitle class="pb-2">{{ courseTitle }}</v-card-subtitle>

    <v-card-text class="pb-2">
      <div class="d-flex">
        <v-rating
          :value="4.5"
          color="amber"
          dense
          half-increments
          readonly
          size="12"
        ></v-rating>
        <div class="grey--text ml-1">4.5 (413)</div>
      </div>
    </v-card-text>
    <v-card-text class="py-0 font-weight-bold"
      >{{ coursePrice }} USD</v-card-text
    >
    <!-- <v-card-actions>
      <v-btn
        color="deep-purple lighten-2"
        text
        width="100%"
        class="d-flex justify-start"
      >
        <v-icon>mdi-cart-plus</v-icon>
        <div>Add to cart</div>
      </v-btn>
    </v-card-actions> -->
  </v-card>
</template>

<script>
export default {
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
    }
  }
};
</script>
