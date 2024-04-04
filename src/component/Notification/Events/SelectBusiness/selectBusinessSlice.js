import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { aboutPlacesById, aboutPlacesEvent, aboutPlacesPhotoUpload } from "../../../../redux/services/eventServices";
import { selectedBusiness } from "../../../../redux/services/notificationEventServices/selectBusinessServices";

const initialState = {};

export const businessSelected = createAsyncThunk(
    "event/selectedbusiness",
    async (payload) => {
        return await selectedBusiness(payload);
    }
);

const selectBusinessSlice = createSlice({
    name: "selectBusinessSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => { },
});
export default selectBusinessSlice.reducer;

// export const selectEvent = (state) => state.event.allEventList;

// export const useEventList = () => {
//     const allEventList = useSelector(selectEvent);
//     return useMemo(() => allEventList, [allEventList]);
// };