import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { useMemo } from "react";
import { allComment, gallery, galleryPost, sendComment } from "../../redux/services/galleryServices";
import { async } from "react-input-emoji";

const initialState = {
  galleryPic: [],
  galleryMyPost: [],
  allComment: []
};
export const userGallery = createAsyncThunk("user/gallery", async () => {
  return await gallery();
});

export const userGalleryPost = createAsyncThunk("user/galleryPosts", async () => {
  return await galleryPost();
})

export const userAllComment = createAsyncThunk("user/allComment", async (payload) => {
  return await allComment(payload);
})

export const userSendComment = createAsyncThunk("user/sendComment", async (payload) => {
  return await sendComment(payload);
})

const gallerySlice = createSlice({
  name: "gallerySlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(userGallery.fulfilled, (state, action) => {
      state.galleryPic = action?.payload?.data?.Data;
    });
    builder.addCase(userGalleryPost.fulfilled, (state, action) => {
      state.galleryMyPost = action?.payload?.data?.Data;
    });
    builder.addCase(userAllComment.fulfilled, (state, action) => {
      state.allComment = action?.payload?.data?.Data;
    })
  },
});

export default gallerySlice.reducer;


export const selectGallery = (state) => state.gallery.galleryPic;
export const useGallery = () => {
  const galleryPic = useSelector(selectGallery);
  return useMemo(() => galleryPic, [galleryPic]);
};

export const selectGalleryMyPost = (state) => state.gallery.galleryMyPost;
export const useGalleryPost = () => {
  const galleryMyPost = useSelector(selectGalleryMyPost);
  return useMemo(() => galleryMyPost, [galleryMyPost]);
};
export const selectAllComment = (state) => state.gallery.allComment;
export const useAllComments = () => {
  const allComment = useSelector(selectAllComment);
  return useMemo(() => allComment, [allComment]);
};
