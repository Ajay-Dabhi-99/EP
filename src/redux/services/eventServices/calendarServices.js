import { CALENDER_ID, GET_ONE_EVENT_BY_ID } from "../../../api/constApi";
import authHeader from "../authHeader";
import { apiInstance } from "../axiosApi";

export const getEventByID = (id) => {
    return apiInstance.get(`${GET_ONE_EVENT_BY_ID}${id}`, {
        headers: authHeader(),
    });
};
export const calendarId = (payload) => {
    return apiInstance.post(CALENDER_ID , payload , {headers: authHeader(),
    });
};
