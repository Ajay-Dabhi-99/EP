import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { search } from "../../redux/SearchServices";

const initialState = {
    searchs: []
}
export const userSearch = createAsyncThunk("user/search", async (payload) => {
    return await search(payload);
});
const searchSlice = createSlice({
    name: "searchSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(userSearch.fulfilled, (state, action) => {
            state.searchs = action?.payload?.data?.Data;
        });
    },
})

export default searchSlice.reducer;

export const selectSearch = (state) => state.redeem.searchs

export const useSearch = () => {
    const searchs = useSelector(selectSearch);
    return useMemo(() => searchs, [searchs]);
}