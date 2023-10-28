import { apiClient } from "./apiClient";

const getLessonById = id => {
  return apiClient.get(`/lesson/${id}`);
};

const addLesson = payload => {
  return apiClient.post("/lesson", payload);
};

export { getLessonById, addLesson };
