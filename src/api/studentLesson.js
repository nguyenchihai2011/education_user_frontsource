import { apiClient } from "./apiClient";

const getStudentLesson = (params = {}) => {
  return apiClient.get("/studentlesson", { params });
};

export { getStudentLesson };
