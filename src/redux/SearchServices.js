import { SEARCH } from "../api/constApi"
import authHeader from "./services/authHeader"
import { apiInstance } from "./services/axiosApi"

export const search = (payload) => {
    return apiInstance.post(SEARCH, payload, { headers: authHeader() });
} 