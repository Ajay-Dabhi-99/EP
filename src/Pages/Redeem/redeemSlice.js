import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { useSelector } from "react-redux";
import { useMemo } from 'react'
import { redeem } from '../../redux/redeemServices'

const initialState = {
    redeems: [],
}

export const userRedeem = createAsyncThunk("user/redeem", async () => {
    return await redeem();
});

const redeemSlice = createSlice({
    name: "redeemSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(userRedeem.fulfilled, (state, action) => {
            state.redeems = action?.payload?.data?.Data;
        });
    },
});

export default redeemSlice.reducer;

export const selectRedeem = (state) => state.redeem.redeems

export const useRedeem = () => {
    const redeems = useSelector(selectRedeem);
    return useMemo(() => redeems, [redeems]);
}