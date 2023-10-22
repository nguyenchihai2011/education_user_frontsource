<template>
  <v-row no-gutters>
    <v-container>
      <v-row>
        <v-col cols="12" class="d-flex align-center justify-space-between mt-6">
          <div class="text-h4">My teaching</div>
          <core-button class="text-none" @click.native="openCourseDialog()">
            <v-icon>mdi-plus</v-icon>
            Create new course
          </core-button>
        </v-col>
        <v-col cols="12">
          <div class="text-h6 font-weight-regular">
            No courses have been created yet
          </div>
        </v-col>
        <v-col cols="12">
          <!-- <course-details></course-details> -->
        </v-col>
      </v-row>
    </v-container>
    <course-dialog
      v-if="isCourseDialog"
      v-model="isCourseDialog"
      @closeDialog="closeCourseDialog()"
    ></course-dialog>
  </v-row>
</template>

<script>
// import CourseDetails from "@/components/course/CourseDetails.vue";
import CoreButton from "@/components/core/CoreButton.vue";
import CourseDialog from "@/components/course/CourseDialog.vue";
export default {
  //   components: { CourseDetails }
  components: { CoreButton, CourseDialog },
  data() {
    return {
      isCourseDialog: false
    };
  },
  methods: {
    openCourseDialog() {
      this.isCourseDialog = true;
    },
    closeCourseDialog() {
      this.isCourseDialog = false;
    }
  }
};
</script>
