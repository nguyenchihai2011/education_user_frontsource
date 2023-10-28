<template>
  <div>
    <div class="black white--text" v-if="isShow">
      <v-container style="position: relative">
        <v-row>
          <v-col cols="8" class="pa-0">
            <div class="text-h4 my-2">{{ course.name }}</div>
            <div class="text-subtitle-1">{{ course.title }}</div>
            <div class="d-flex mx-0 my-2">
              <v-rating
                :value="4.5"
                color="amber"
                dense
                half-increments
                readonly
                size="12"
              ></v-rating>
              <div class="purple--text text--lighten-4 ml-1">
                4.5 (1020 ratings)
              </div>
            </div>
            <div>
              Created by
              <span class="purple--text text--lighten-4"
                >{{ course.lecture.firstName }}
                {{ course.lecture.lastName }}</span
              >
            </div>
            <div class="d-flex mt-2 my-8">
              <v-icon color="white">mdi-alert-octagram</v-icon>
              <div class="ml-2 text-subtitle-2">
                Last updated {{ formatDate(course.updateAt) }}
              </div>
              <v-icon color="white" class="ml-4">mdi-web</v-icon>
              <div class="ml-2 text-subtitle-2">{{ course.language }}</div>
            </div>
          </v-col>
          <v-col
            cols="4"
            style="position: absolute; right: 0; top: 0"
            class="pa-0"
          >
            <v-card class="rounded-0">
              <video controls width="100%">
                <source src="@/assets/videos/Demo.mp4" />
              </video>
              <v-card-title class="text-h5 font-weight-bold"
                >{{ course.price }} USD</v-card-title
              >
              <div v-if="!isLogged || (isStudent && !hasCourse)">
                <!-- <v-card-title class="py-0">
                  <v-btn class="text-none purple white--text" text width="100%"
                    >Add to card</v-btn
                  >
                </v-card-title> -->
                <v-card-title class="pt-2 pb-8">
                  <v-btn
                    class="text-none"
                    outlined
                    width="100%"
                    @click="buyNow()"
                    >Buy now</v-btn
                  >
                </v-card-title>
              </div>
              <div v-else>
                <v-card-title class="py-4">
                  <v-btn
                    @click="
                      $router.push(
                        `/course/${course.id}/lesson/${course.sections[0].lessons[0].id}`
                      )
                    "
                    class="text-none purple white--text"
                    text
                    width="100%"
                    >Go to course</v-btn
                  >
                </v-card-title>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </div>
    <v-container>
      <v-row>
        <v-col cols="8" class="pl-0 mt-4">
          <v-card>
            <v-card-title class="text-h5 font-weight-bold">
              What you'll learn
            </v-card-title>
            <v-row class="mx-4">
              <v-col cols="6" class="d-flex">
                <v-icon class="mr-2">mdi-check</v-icon>
                <div>Only practical demostations of javascript concepts</div>
              </v-col>
              <v-col cols="6" class="d-flex">
                <v-icon class="mr-2">mdi-check</v-icon>
                <div>Only practical demostations of javascript concepts</div>
              </v-col>
              <v-col cols="6" class="d-flex">
                <v-icon class="mr-2">mdi-check</v-icon>
                <div>Only practical demostations of javascript concepts</div>
              </v-col>
              <v-col cols="6" class="d-flex">
                <v-icon class="mr-2">mdi-check</v-icon>
                <div>Only practical demostations of javascript concepts</div>
              </v-col>
              <v-col cols="6" class="d-flex">
                <v-icon class="mr-2">mdi-check</v-icon>
                <div>Only practical demostations of javascript concepts</div>
              </v-col>
            </v-row>
          </v-card>
          <div class="mt-15">
            <v-card-title
              class="text-h5 font-weight-bold justify-space-between"
            >
              <div>Course content</div>
              <core-button
                v-if="isLecture"
                class="text-none"
                outlined
                @click.native="openSectionDialog()"
              >
                <v-icon>mdi-plus</v-icon>
                Create new section
              </core-button>
            </v-card-title>
            <!-- <v-card-subtitle>
              1 section <v-icon>mdi-circle-small</v-icon> 7 lectures
              <v-icon>mdi-circle-small</v-icon> 37m total
              lenght</v-card-subtitle
            > -->
            <v-row class="mx-4">
              <v-col cols="12">
                <v-expansion-panels>
                  <v-expansion-panel
                    v-for="item in course.sections"
                    :key="item.id"
                  >
                    <v-expansion-panel-header class="font-weight-bold text-h6">
                      {{ item.name }}
                    </v-expansion-panel-header>
                    <v-expansion-panel-content
                      v-for="lesson in item.lessons"
                      :key="lesson.id"
                    >
                      <v-card flat>
                        <v-row>
                          <v-col cols="1"
                            ><v-icon>mdi-presentation-play</v-icon></v-col
                          >
                          <v-col cols="7"
                            ><div>{{ lesson.name }}</div></v-col
                          >
                          <v-col cols="2">
                            <v-btn
                              text
                              class="d-flex justify-end text-none blue--text text-decoration-underline"
                              @click="openVideoDialog(lesson)"
                            >
                              Preview
                            </v-btn>
                          </v-col>
                          <v-col cols="2"
                            ><div class="d-flex justify-end">01:43</div></v-col
                          >
                        </v-row>
                      </v-card>
                    </v-expansion-panel-content>
                    <v-expansion-panel-content>
                      <div class="d-flex justify-end">
                        <core-button
                          v-if="isLecture"
                          class="text-none"
                          outlined
                          @click.native="openLessonDialog(item.id)"
                        >
                          <v-icon>mdi-plus</v-icon>
                          Create new section
                        </core-button>
                      </div>
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-expansion-panels>
              </v-col>
            </v-row>
          </div>
          <div class="mt-15">
            <v-card-title class="text-h5 font-weight-bold">
              Description
            </v-card-title>
            <v-card-subtitle class="font-weight-bold font-italic pt-1">
              Learn javascript programming language
            </v-card-subtitle>
            <div class="px-4">
              <p>
                Take this Javascript training course and start learning
                Javascript today. "As a business person, I have no place in
                programming." Ten years ago you could have gotten away with that
                statement.
              </p>
              <p>
                Take this Javascript training course and start learning
                Javascript today. "As a business person, I have no place in
                programming." Ten years ago you could have gotten away with that
                statement.
              </p>
              <p>
                Take this Javascript training course and start learning
                Javascript today. "As a business person, I have no place in
                programming." Ten years ago you could have gotten away with that
                statement.
              </p>
            </div>
          </div>
          <div class="mt-15">
            <v-card-title class="text-h5 font-weight-bold">
              <v-icon color="amber">mdi-star</v-icon>
              <div class="text-h6 font-weight-bold">4.5 course rating</div>
            </v-card-title>
            <v-row class="px-4">
              <v-col cols="6">
                <v-card>
                  <div class="d-flex align-center">
                    <v-avatar color="teal" size="48" class="ma-4">
                      <span class="white--text text-h5">48</span>
                    </v-avatar>
                    <div>
                      <div class="font-weight-bold">Shine L.</div>
                      <v-rating
                        :value="4.5"
                        color="amber"
                        dense
                        half-increments
                        readonly
                        size="12"
                      ></v-rating>
                    </div>
                    <v-divider></v-divider>
                    <v-btn text small>
                      <v-icon size="20">mdi-dots-vertical</v-icon>
                    </v-btn>
                  </div>
                  <div class="pa-4 pb-6">Easy to understand</div>
                </v-card>
              </v-col>
              <v-col cols="6">
                <v-card>
                  <div class="d-flex align-center">
                    <v-avatar color="teal" size="48" class="ma-4">
                      <span class="white--text text-h5">48</span>
                    </v-avatar>
                    <div>
                      <div class="font-weight-bold">Shine L.</div>
                      <v-rating
                        :value="4.5"
                        color="amber"
                        dense
                        half-increments
                        readonly
                        size="12"
                      ></v-rating>
                    </div>
                    <v-divider></v-divider>
                    <v-btn text small>
                      <v-icon size="20">mdi-dots-vertical</v-icon>
                    </v-btn>
                  </div>
                  <div class="pa-4 pb-6">Easy to understand</div>
                </v-card>
              </v-col>
              <v-col cols="6">
                <v-card>
                  <div class="d-flex align-center">
                    <v-avatar color="teal" size="48" class="ma-2">
                      <span class="white--text text-h5">48</span>
                    </v-avatar>
                    <div>
                      <div class="font-weight-bold">Shine L.</div>
                      <v-rating
                        :value="4.5"
                        color="amber"
                        dense
                        half-increments
                        readonly
                        size="12"
                      ></v-rating>
                    </div>
                    <v-divider></v-divider>
                    <v-btn text small>
                      <v-icon size="20">mdi-dots-vertical</v-icon>
                    </v-btn>
                  </div>
                  <div class="pa-4 pb-6">Easy to understand</div>
                </v-card>
              </v-col>
              <v-col cols="6">
                <v-card>
                  <div class="d-flex align-center">
                    <v-avatar color="teal" size="48" class="ma-2">
                      <span class="white--text text-h5">48</span>
                    </v-avatar>
                    <div>
                      <div class="font-weight-bold">Shine L.</div>
                      <v-rating
                        :value="4.5"
                        color="amber"
                        dense
                        half-increments
                        readonly
                        size="12"
                      ></v-rating>
                    </div>
                    <v-divider></v-divider>
                    <v-btn text small>
                      <v-icon size="20">mdi-dots-vertical</v-icon>
                    </v-btn>
                  </div>
                  <div class="pa-4 pb-6">Easy to understand</div>
                </v-card>
              </v-col>
            </v-row>
          </div>
          <v-btn class="text-none ml-4 mt-4" outlined>Show all review</v-btn>
        </v-col>
      </v-row>
    </v-container>
    <section-dialog
      v-if="isSectionDialog"
      v-model="isSectionDialog"
      :idInit="course.id"
      @closeDialog="closeDialog()"
    ></section-dialog>
    <lesson-dialog
      v-if="isLessonDialog"
      v-model="isLessonDialog"
      :sectionId="sectionId"
      :idInit="lessonId"
      @closeDialog="closeDialog()"
    ></lesson-dialog>
    <video-dialog
      v-if="isVideoDialog"
      v-model="isVideoDialog"
      :title="title"
      :videoUrl="videoUrl"
      @closeDialog="closeDialog()"
    >
    </video-dialog>
  </div>
</template>
<script>
import _ from "lodash";
import SectionDialog from "@/components/section/SectionDialog.vue";
import LessonDialog from "@/components/lesson/LessonDialog.vue";
import CoreButton from "@/components/core/CoreButton.vue";
import VideoDialog from "@/components/video/VideoDialog.vue";
import { getCourseById } from "@/api/course";
import { mapActions, mapGetters } from "vuex";
export default {
  components: {
    SectionDialog,
    LessonDialog,
    CoreButton,
    VideoDialog
  },
  data() {
    return {
      course: {},
      isShow: false,
      isSectionDialog: false,
      isLessonDialog: false,
      lessonId: undefined,
      sectionId: undefined,
      lessons: [],
      isVideoDialog: false,
      title: "",
      videoUrl: ""
    };
  },

  computed: {
    ...mapGetters("auth", ["role", "token"]),
    ...mapGetters("yourself", ["coursesOfStudent"]),

    isLogged() {
      return !!this.token;
    },

    isStudent() {
      return this.role === "Student";
    },

    isLecture() {
      return this.role === "Lecture";
    },

    hasCourse() {
      return _.some(this.coursesOfStudent, { courseId: this.course.id });
    }
  },

  methods: {
    ...mapActions("buy", ["setIsBuyNow", "setCourseBuyNow"]),
    formatDate(date) {
      const result = new Date(date);
      return result.toLocaleDateString("en-GB");
    },
    openSectionDialog() {
      this.isSectionDialog = true;
    },

    openLessonDialog(sectionId) {
      this.sectionId = sectionId;
      this.isLessonDialog = true;
    },

    openVideoDialog(lesson) {
      this.isVideoDialog = true;
      this.title = lesson.name;
      this.videoUrl = lesson.videoUrl;
    },

    closeDialog() {
      this.isSectionDialog = false;
      this.isLessonDialog = false;
      this.isVideoDialog = false;
    },

    buyNow() {
      this.setIsBuyNow(true);
      this.setCourseBuyNow(this.course);
      this.$router.push("/checkout");
    }
  },

  created() {
    getCourseById(this.$route.params.id).then(res => {
      this.course = res.data;
      this.isShow = true;
    });
  }
};
</script>
