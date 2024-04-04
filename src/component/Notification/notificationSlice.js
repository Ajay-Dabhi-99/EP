import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { useMemo } from "react";
import {
    createNotification,
    notification,
    photoUpload,
} from "../../redux/services/notificationServices";

const initialState = {
    notifications: {},
};

export const userNotification = createAsyncThunk(
    "notification/getnotification",
    async (payload) => {
        return await notification(payload);
    }
);
export const userCreateNotification = createAsyncThunk(
    "notification/createnotification",
    async (payload) => {
        return await createNotification(payload);
    }
);
export const photoUploadNotification = createAsyncThunk(
    "notification/photoupload",
    async (payload) => {
        return await photoUpload(payload);
    }
);

const notificationSlice = createSlice({
    name: "notificationSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(userNotification.fulfilled, (state, action) => {
            state.notifications = action?.payload?.data?.Data;
        });
    },
});

export default notificationSlice.reducer;

export const selectUserNotification = (state) =>
    state.notification.notifications;

export const useUserNotification = () => {
    const notifications = useSelector(selectUserNotification);
    return useMemo(() => notifications, [notifications]);
};
