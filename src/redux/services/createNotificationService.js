import { apiInstance } from "./axiosApi"

export const addSelectbusiness = (payload) => {
    return apiInstance.post(GETORGANIZERPROFILE, payload)
}