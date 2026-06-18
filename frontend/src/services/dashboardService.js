import API from "../api/api";

export const getDashboard = () => {
  return API.get("/dashboard", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};