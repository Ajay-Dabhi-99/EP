import { MEDIA, MEDIA_BY_ID, PHOTOS_UPLOAD, VIDEOS_UPLOAD } from "../../../api/constApi";
import authHeader from "../authHeader";
import { apiInstance } from "../axiosApi";

export const photosUpload = (payload) => {
    return apiInstance.post(PHOTOS_UPLOAD, payload, {
      headers: authHeader(),
    });
  };
  export const mediaById = (id) => {
    return apiInstance.get(`${MEDIA_BY_ID}${id}`, {
      headers: authHeader(),
    });
  };
  export const videosUpload = (payload) => {
    return apiInstance.post(VIDEOS_UPLOAD, payload, {
      headers: authHeader(),
    });
  };
  export const allMedia = (payload) => {
    return apiInstance.post(MEDIA, payload, {
      headers: authHeader(),
    });
  };
