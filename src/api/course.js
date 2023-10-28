import { apiClient } from "./apiClient";

const getCourse = (params = {}) => {
  return apiClient.get("/course", { params });
};

const getCourseById = id => {
  return apiClient.get(`/course/${id}`);
};

const addCourse = payload => {
  return apiClient.post("/course", payload);
};

export { getCourse, getCourseById, addCourse };
