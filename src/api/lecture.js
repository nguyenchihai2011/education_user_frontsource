import { apiClient } from "./apiClient";

const changeProfileLecture = (id, payload) => {
  return apiClient.put(`/lecture/${id}`, payload);
};

const createProfileLecture = payload => {
  return apiClient.post(`/lecture`, payload);
};

export { changeProfileLecture, createProfileLecture };
