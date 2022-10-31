import API from "./ApiRequest";

export const userChats = (userId) => API.get(`/chat/${userId}`);
