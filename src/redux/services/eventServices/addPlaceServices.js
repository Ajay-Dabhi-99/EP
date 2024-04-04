import { ADD_PLACES_EVENT, REMOVE_PLACES_EVENT } from "../../../api/constApi";
import authHeader from "../authHeader";
import { apiInstance } from "../axiosApi";

export const addPlacesEvent = (eventId) => {
    return apiInstance.get(`${ADD_PLACES_EVENT}${eventId}`, {
      headers: authHeader(),
    });
  };
  export const removePlacesEvent = (payload) => {
    return apiInstance.post(REMOVE_PLACES_EVENT, payload, {
      headers: authHeader(),
    });
  };
  