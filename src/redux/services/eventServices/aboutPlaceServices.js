import { ABOUT_PLACES_BY_ID, ABOUT_PLACES_EVENT, ABOUT_PLACES_PHOTOUPLOAD } from "../../../api/constApi";
import authHeader, { imageHeader } from "../authHeader";
import { apiInstance } from "../axiosApi";



export const aboutPlacesPhotoUpload = (payload) => {
    return apiInstance.post(ABOUT_PLACES_PHOTOUPLOAD, payload, {
      headers: imageHeader(),
    });
  };
  export const aboutPlacesEvent = (payload) => {
    return apiInstance.post(ABOUT_PLACES_EVENT, payload, {
      headers: authHeader(),
    });
  };
  export const aboutPlacesById = (id) => {
    return apiInstance.get(`${ABOUT_PLACES_BY_ID}${id}`, {
      headers: authHeader(),
    });
  };
  