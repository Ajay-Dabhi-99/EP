import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { getInTouch } from "../../redux/services/landingService";

const initialState = {};

export const getInTouchLanding = createAsyncThunk(
    "event/getintouch",
    async (payload) => {
        return await getInTouch(payload);
    }
);

const landingSlice = createSlice({
    name: "landingSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => { },
});
export default landingSlice.reducer;

// export const selectEvent = (state) => state.event.allEventList;

// export const useEventList = () => {
//     const allEventList = useSelector(selectEvent);
//     return useMemo(() => allEventList, [allEventList]);
// };