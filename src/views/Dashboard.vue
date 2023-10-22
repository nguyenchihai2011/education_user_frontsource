<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" class="pa-0">
        <v-carousel hide-delimiters>
          <v-carousel-item
            v-for="(item, i) in items"
            :key="i"
            :src="item.src"
          ></v-carousel-item>
        </v-carousel>
      </v-col>
      <v-col cols="12" class="pb-0">
        <div class="text-h5">Top Best Sellers</div>
      </v-col>
      <v-col cols="12" class="d-flex">
        <v-row>
          <v-col cols="2">
            <course-intro />
          </v-col>
          <v-col cols="2">
            <course-intro />
          </v-col>
          <v-col cols="2">
            <course-intro />
          </v-col>
          <v-col cols="2">
            <course-intro />
          </v-col>
          <v-col cols="2">
            <course-intro />
          </v-col>
          <v-col cols="2">
            <course-intro />
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" class="pb-0">
        <div class="text-h5">Super Deals</div>
      </v-col>
      <v-col cols="12" class="d-flex">
        <v-row>
          <v-col cols="2">
            <course-intro />
          </v-col>
          <v-col cols="2">
            <course-intro />
          </v-col>
          <v-col cols="2">
            <course-intro />
          </v-col>
          <v-col cols="2">
            <course-intro />
          </v-col>
          <v-col cols="2">
            <course-intro />
          </v-col>
          <v-col cols="2">
            <course-intro />
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" class="pb-0">
        <div class="text-h5">Recommended for you</div>
      </v-col>
      <v-col cols="12" class="d-flex">
        <v-row>
          <v-col cols="2">
            <course-intro />
          </v-col>
          <v-col cols="2">
            <course-intro />
          </v-col>
          <v-col cols="2">
            <course-intro />
          </v-col>
          <v-col cols="2">
            <course-intro />
          </v-col>
          <v-col cols="2">
            <course-intro />
          </v-col>
          <v-col cols="2">
            <course-intro />
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12">
        <v-row class="justify-center">
          <v-col cols="3" class="d-flex flex-column justify-center">
            <div class="text-h4 font-weight-bold mb-4">
              Upskill your team with Open Education
            </div>
            <ul class="text-h6 font-weight-regular">
              <li>
                Unlimited access to 22,000+ top Open Education courses, anytime,
                anywhere
              </li>
              <li>
                International course collection in 14 languages
              </li>
              <li>
                Top certifications in tech and business
              </li>
            </ul>
          </v-col>
          <v-col cols="3">
            <v-img src="@/assets/dashboard_intro_education.jpg"></v-img>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12">
        <v-row class="justify-center">
          <v-col cols="3">
            <v-img src="@/assets/dashboard_become_lecture.jpg"></v-img>
          </v-col>
          <v-col cols="3" class="d-flex flex-column justify-center">
            <div class="text-h4 font-weight-bold mb-4">
              Become an instructor
            </div>
            <div class="text-h6 font-weight-regular mb-4">
              Instructors from around the world teach millions of learners on
              Open Education. We provide the tools and skills to teach what you
              love.
            </div>
            <core-button
              class="black white--text py-6"
              link
              to="/authentication/sign-up/lecture"
              >Start teaching today</core-button
            >
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import CourseIntro from "@/components/course/CourseIntro.vue";
import CoreButton from "@/components/core/CoreButton.vue";
export default {
  components: { CourseIntro, CoreButton },
  data: () => ({
    items: [
      {
        src: "https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg"
      },
      {
        src: "https://cdn.vuetifyjs.com/images/carousel/sky.jpg"
      },
      {
        src: "https://cdn.vuetifyjs.com/images/carousel/bird.jpg"
      },
      {
        src: "https://cdn.vuetifyjs.com/images/carousel/planet.jpg"
      }
    ]
  }),
  computed: {},

  created() {},

  methods: {}
};
</script>
<style lang=""></style>
