export default {
  token: state => state.token || localStorage.getItem("token"),
  userId: state => state.userId || localStorage.getItem("userId"),
  lectureId: state => state.lectureId || localStorage.getItem("lectureId"),
  studentId: state => state.studentId || localStorage.getItem("studentId"),
  role: state => state.role || localStorage.getItem("role")
};
