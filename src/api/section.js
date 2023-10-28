import { apiClient } from "./apiClient";

const getSections = () => {
  return apiClient.get("/section");
};

const getSectionById = id => {
  return apiClient.get(`/section/${id}`);
};

const addSection = payload => {
  return apiClient.post("/section", payload);
};

export { getSections, getSectionById, addSection };
