import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import {
    discount,
    discountById,
    discountList,
    getSelectServiceById,
    getSelectServiceDiscount,
} from "../../../../redux/services/eventServices/discountServices";

const initialState = {
    stateDiscountId: []
};

export const listOfDiscount = createAsyncThunk(
    "event/listofdiscount",
    async () => {
        return await discountList();
    }
);

export const discountId = createAsyncThunk("event/discountId", async (id) => {
    return await discountById(id);
});

export const discounts = createAsyncThunk(
    "event/discounts",
    async (payload) => {
        return await discount(payload);
    }
);

export const getSelectServiceId = createAsyncThunk(
    "event/getSelectServicebyid",
    async (id) => {
        return await getSelectServiceById(id);
    }
);

export const discountGetSelectServiceId = createAsyncThunk(
    "event/getSelectServicebyid",
    async (id) => {
        return await getSelectServiceDiscount(id);
    }
);

const eventDiscountSlice = createSlice({
    name: "eventDiscountSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(discountId.fulfilled, (state, action) => {
            state.stateDiscountId = action?.payload?.data?.Data
        })
    },
});
export default eventDiscountSlice.reducer;

export const selectDiscountId = (state) => state.eventDiscount.stateDiscountId;

export const useDiscountId = () => {
    const stateDiscountId = useSelector(selectDiscountId);
    return useMemo(() => stateDiscountId, [stateDiscountId]);
};
