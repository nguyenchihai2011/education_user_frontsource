<template>
  <v-container fluid class="pa-0" v-if="isShow">
    <v-row no-gutters>
      <v-col>
        <v-card style="position: relative" :key="videoCard">
          <video controls width="100%" height="500">
            <source :src="lesson.videoUrl" />
          </video>
          <v-btn
            class="rounded-circle"
            absolute
            style="right: -18px; top: 200px; z-index: 2"
            width="30"
            height="30"
            min-width="30"
            @click="isNavigation = !isNavigation"
          >
            <v-icon color="#898989">{{
              isNavigation ? "mdi-chevron-right" : "mdi-chevron-left"
            }}</v-icon>
          </v-btn>
        </v-card>
        <v-tabs v-model="tab">
          <v-tabs-slider color="black"></v-tabs-slider>

          <v-tab class="ml-0 text-none black--text"> Overview </v-tab>
          <v-tab class="ml-0 text-none black--text"> Comment </v-tab>
        </v-tabs>
        <v-tabs-items v-model="tab">
          <v-tab-item>
            <v-card flat>
              <v-card-text> </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card flat class="ma-4">
              <div class="d-flex align-start mb-16">
                <v-avatar color="teal" size="48" class="ma-4">
                  <img :src="avatarUrl" alt="John" />
                </v-avatar>
                <v-textarea
                  v-model="commentText"
                  outlined
                  placeholder="Enter the text comment"
                  color="#000"
                  hide-details
                  height="80"
                  class="rounded-l lecture-comment"
                ></v-textarea>
                <v-btn text @click="sendComment()"
                  ><v-icon>mdi-send</v-icon></v-btn
                >
              </div>
              <div
                class="d-flex mb-6"
                v-for="comment in comments"
                :key="comment.id"
              >
                <v-avatar size="48" class="mr-4">
                  <img :src="comment.avatarUrl" alt="John" />
                </v-avatar>
                <div>
                  <div class="font-weight-bold">{{ comment.name }}</div>
                  <div>
                    {{ comment.content }}
                  </div>
                </div>
              </div>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
        <core-footer />
      </v-col>
      <v-col v-if="isNavigation" cols="3">
        <v-card
          class="overflow-y-auto"
          style="position: fixed; height: calc(100vh - 80px)"
          flat
        >
          <div class="d-flex justify-space-between align-center py-2">
            <div class="ml-4 text-h5 font-ưeight-bold">Course Content</div>
            <div class="d-flex justify-end align-center">
              <progress-chart :data="dataProgress" :width="80" :height="80" />
              <v-btn @click="isNavigation = false" text>
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </div>
          </div>
          <v-expansion-panels multiple flat>
            <v-expansion-panel
              v-for="item in course.sections"
              :key="item.id"
              class="mt-0"
            >
              <v-expansion-panel-header class="font-weight-bold text-h6">
                {{ item.name }}
              </v-expansion-panel-header>
              <v-expansion-panel-content
                v-for="lesson in item.lessons"
                :key="lesson.id"
              >
                <v-card flat class="d-flex align-start">
                  <v-checkbox
                    v-model="lesson.studentLessons[0].isLock"
                    class="ma-0 mr-2"
                    @click="updateProgress(lesson.id)"
                  ></v-checkbox>
                  <v-card-actions
                    @click="
                      $router.push(`/course/${course.id}/lesson/${lesson.id}`)
                    "
                  >
                    <div class="font-weight-bold">{{ lesson.name }}</div>
                    <v-icon class="mr-2" size="20">mdi-television-play</v-icon>
                  </v-card-actions>
                </v-card>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import CoreFooter from "@/components/core/CoreFooter.vue";
import { getCourseById } from "@/api/course";
import { getLessonById } from "@/api/lesson";
import {
  getStudentLesson,
  updateProgress,
  getProgress
} from "@/api/studentLesson";
import { mapGetters } from "vuex";
import ProgressChart from "@/components/app/ProgressChart.vue";
import { getCommentsCourse } from "@/api/comment";

const connection = new signalR.HubConnectionBuilder()
  .withUrl("https://localhost:7254/chatHub", {
    skipNegotiation: true,
    transport: signalR.HttpTransportType.WebSockets
  })
  .build();

export default {
  components: { CoreFooter, ProgressChart },

  data() {
    return {
      videoCard: 0,
      isShow: false,
      isNavigation: true,
      tab: null,
      course: {},
      lesson: {},
      studentLessons: [],
      dataProgress: [],
      comments: [],
      commentText: ""
    };
  },

  computed: {
    ...mapGetters("auth", ["studentId", "userId", "avatarUrl"])
  },

  watch: {
    "$route.params.id"(val) {
      getLessonById(val).then(res => {
        this.lesson = res.data;
        this.videoCard++;
      });
    }
  },

  methods: {
    selectLesson(lessonId) {
      getLessonById(lessonId).then(res => {
        this.lesson = res.data;
        this.videoCard++;
      });
    },

    updateProgress(lessonId) {
      const params = {
        studentId: Number(this.studentId),
        lessonId: lessonId,
        courseId: this.course.id
      };
      updateProgress(params).then(res => {
        this.dataProgress = res.data;
      });
    },
    getCommentsCourse() {
      console.log("getCommentsCourse");
      const params = {
        courseId: this.$route.params.courseId
      };
      getCommentsCourse(params).then(res => {
        this.comments = res.data;
      });
    },

    sendComment() {
      const payload = {
        content: this.commentText,
        createAt: "2023-10-29T08:02:44.274Z",
        updateAt: "2023-10-29T08:02:44.274Z",
        userId: this.userId,
        courseId: Number(this.$route.params.courseId)
      };
      console.log(payload);
      connection.invoke("SendComment", payload);
    }
  },

  created() {
    getCourseById(this.$route.params.courseId).then(res => {
      this.course = res.data;
      this.isShow = true;
    });

    getLessonById(this.$route.params.id).then(res => {
      this.lesson = res.data;
    });
    const params = {
      courseId: this.$route.params.courseId,
      studentId: this.studentId
    };
    getStudentLesson(params).then(res => {
      this.studentLessons = res.data;
    });
    const progressParams = {
      courseId: this.$route.params.courseId,
      studentId: this.studentId
    };
    getProgress(progressParams).then(res => {
      this.dataProgress = res.data;
    });
    this.getCommentsCourse();
  },

  mounted() {
    var self = this;
    connection
      .start()
      .then(function() {
        console.log("SignalR Connected!");
        connection.on("ReceiveComment", () => {
          console.log("agfagd");
          self.getCommentsCourse();
        });
      })
      .catch(function(err) {
        return console.error(err.toString());
      });
  }
};
</script>

<style lang="scss" scoped></style>
