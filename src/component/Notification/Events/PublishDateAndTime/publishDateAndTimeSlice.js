import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { notificationSetSchedule } from "../../../../redux/services/notificationEventServices/publishDateAndTimeServices";

const initialState = {};

export const setScheduleNotification = createAsyncThunk(
    "event/notificationsetschedule",
    async (payload) => {
        return await notificationSetSchedule(payload);
    }
);

const publishDateAndTimeSlice = createSlice({
    name: "publishDateAndTimeSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => { },
});
export default publishDateAndTimeSlice.reducer;

// export const selectEvent = (state) => state.event.allEventList;

// export const useEventList = () => {
//     const allEventList = useSelector(selectEvent);
//     return useMemo(() => allEventList, [allEventList]);
// };