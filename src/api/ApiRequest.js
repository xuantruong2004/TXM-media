import axios from "axios";

const API = axios.create({
  baseURL: "https://social-media-appclone.herokuapp.com",
});
export default API;
