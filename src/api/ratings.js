import { apiClient } from "./apiClient";

const getRatingsCourse = params => {
  return apiClient.get(`getRatings?courseId=${params}`);
};

export { getRatingsCourse };
