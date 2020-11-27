import axios from "axios";

export const login = (userInfo: any) => {
  return axios.post(
    "http://localhost:3000/login/google/authenticate",
    userInfo
  );
};
