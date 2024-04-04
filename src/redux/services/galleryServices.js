import { ALL_COMMENT, GALLERY, GALLERY_MYPOST, SEND_COMMENT } from "../../api/constApi";
import authHeader from "./authHeader";
import { apiInstance } from "./axiosApi";

export const gallery = () => {
  return apiInstance.get(GALLERY, { headers: authHeader() });
};
export const galleryPost = () => {
  return apiInstance.get(GALLERY_MYPOST, { headers: authHeader() });
}

export const allComment = (payload) => {
  return apiInstance.post(ALL_COMMENT, payload, { headers: authHeader() });
}

export const sendComment = (payload) => {
  return apiInstance.post(SEND_COMMENT, payload, { headers: authHeader() });
}