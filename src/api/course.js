import { apiClient } from "./apiClient";

const addCourse = payload => {
  return apiClient.post("/course", payload);
};

export { addCourse };
