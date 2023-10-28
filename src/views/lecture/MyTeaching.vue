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
        <v-col v-if="courses.length === 0" cols="12">
          <div class="text-h6 font-weight-regular">
            No courses have been created yet
          </div>
        </v-col>
        <v-col v-else cols="12">
          <v-row no-gutters v-for="course in courses" :key="course.id">
            <v-col cols="12">
              <course-details
                :courseId="course.id"
                :courseImage="course.imageUrl"
                :courseName="course.name"
                :courseTitle="course.title"
                :coursePrice="course.price"
                :lectureName="lectureFullName(course.lecture)"
                :showPrice="false"
              ></course-details>
            </v-col>
          </v-row>
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
import CourseDetails from "@/components/course/CourseDetails.vue";
import { getCourse } from "@/api/course";
import CoreButton from "@/components/core/CoreButton.vue";
import CourseDialog from "@/components/course/CourseDialog.vue";
export default {
  components: { CoreButton, CourseDialog, CourseDetails },
  data() {
    return {
      isCourseDialog: false,
      courses: []
    };
  },

  methods: {
    fetchCourseYourself() {
      getCourse().then(res => {
        this.courses = res.data;
      });
    },

    openCourseDialog() {
      this.isCourseDialog = true;
    },
    closeCourseDialog() {
      this.isCourseDialog = false;
    },

    lectureFullName(lecture) {
      return `${lecture?.firstName} ${lecture?.lastName}`;
    }
  },

  created() {
    this.fetchCourseYourself();
  }
};
</script>
