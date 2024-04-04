import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import {
  allMedia,
  mediaById,
  photosUpload,
  videosUpload,
} from "../../../../redux/services/eventServices/photoAndVideoServices";

const initialState = {};

export const uploadPhoto = createAsyncThunk(
  "event/imageUpload",
  async (payload) => {
    return await photosUpload(payload);
  }
);

export const mediaId = createAsyncThunk("event/mediabyid", async (id) => {
  return await mediaById(id);
});

export const uploadVideo = createAsyncThunk(
  "event/videosUpload",
  async (payload) => {
    return await videosUpload(payload);
  }
);

export const AllMedia = createAsyncThunk("event/media", async (payload) => {
  return await allMedia(payload);
});

const eventPhotoAndVideoSlice = createSlice({
  name: "eventPhotoAndVideoSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});
export default eventPhotoAndVideoSlice.reducer;

// export const selectEvent = (state) => state.event.allEventList;

// export const useEventList = () => {
//     const allEventList = useSelector(selectEvent);
//     return useMemo(() => allEventList, [allEventList]);
// };
