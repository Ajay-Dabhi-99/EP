import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { selectNotificationUser } from "../../../../redux/services/notificationEventServices/userServices";

const initialState = {};

export const selectUser = createAsyncThunk(
    "event/selectUser",
    async (payload) => {
        return await selectNotificationUser(payload);
    }
);

const userSlice = createSlice({
    name: "userSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => { },
});
export default userSlice.reducer;

// export const selectEvent = (state) => state.event.allEventList;

// export const useEventList = () => {
//     const allEventList = useSelector(selectEvent);
//     return useMemo(() => allEventList, [allEventList]);
// };