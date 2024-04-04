import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { getoneNotification, notificationCouponList, notificationSetting, payNow } from "../../../../redux/services/notificationEventServices/billDetailsServices";

const initialState = {
    notificationGetOneDetails:[],
    settingNotificationDetails:[]
};

export const notificationGetone = createAsyncThunk(
    "notification/getonenotification",
    async (payload) => {
        return await getoneNotification(payload);
    }
);
export const settingNotification = createAsyncThunk(
    "notification/notificationsetting",
    async (payload) => {
        return await notificationSetting(payload);
    }
);

export const couponListNotification = createAsyncThunk(
    "event/couponListNotification",
    async () => {
        return await notificationCouponList();
    }
);

export const notificationPayNow = createAsyncThunk(
    "event/notificationPayNow",
    async (payload) => {
        return await payNow(payload);
    }
);

const billDetailsSlice = createSlice({
    name: "billDetailsSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(notificationGetone.fulfilled, (state, action) => {
            state.notificationGetOneDetails = action?.payload?.data?.Data;
        });
        builder.addCase(settingNotification.fulfilled, (state, action) => {
            state.settingNotificationDetails = action?.payload?.data?.Data;
        });
     },
});
export default billDetailsSlice.reducer;

export const selectGetOne = (state) => state.billDetails.notificationGetOneDetails;

export const useGetOneDetails = () => {
    const notificationGetOneDetails = useSelector(selectGetOne);
    return useMemo(() => notificationGetOneDetails, [notificationGetOneDetails]);
};

export const selectSetting = (state) => state.billDetails.settingNotificationDetails;

export const useSetting = () => {
    const settingNotificationDetails = useSelector(selectSetting);
    return useMemo(() => settingNotificationDetails, [settingNotificationDetails]);
};