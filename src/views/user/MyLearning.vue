<template>
  <v-row no-gutters>
    <v-col cols="12">
      <div>My learning</div>
    </v-col>
    <v-col cols="12">
      <course-details></course-details>
    </v-col>
  </v-row>
</template>

<script>
import CourseDetails from "@/components/course/CourseDetails.vue";
export default {
  components: { CourseDetails }
};
</script>
