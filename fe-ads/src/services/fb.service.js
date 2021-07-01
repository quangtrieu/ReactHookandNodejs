import axios from "axios";

const API_URL = "http://localhost:8080/";

const loginFB = (username, password) => {
  return axios
    .post(API_URL + "facebook", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

export default {
  loginFB,
  logout,
  getCurrentUser,
};
