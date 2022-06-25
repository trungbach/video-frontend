import { createReducer } from "@reduxjs/toolkit";
import {
  createVideo,
  getVideos,
  deleteVideo,
  getDetailVideo,
  updateVideo,
  feedbackVideo,
} from "./actions";
import { message } from "antd";
import { handleError } from "@/config/apiConfig";
import Router from "next/router";

const initialState = {
  pending: false,
  error: false,
  newVideo: undefined,
  deleteSuccess: undefined,
  detailVideo: undefined,
  listVideos: [],
};

export const videoReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(createVideo.pending, (state) => {
      state.pending = true;
    })
    .addCase(createVideo.fulfilled, (state, { payload }) => {
      console.log("create video: ", payload);
      state.newVideo = payload;
      message.success("Create content success!");
      Router.push("/home");
    })
    .addCase(createVideo.rejected, (state, action) => {
      state.pending = false;
      state.error = true;

      handleError(action.payload);
    })

    .addCase(getVideos.pending, (state) => {
      state.pending = true;
    })
    .addCase(getVideos.fulfilled, (state, { payload }) => {
      console.log("get videos: ", payload);
      state.listVideos = payload.data;
      state.pending = false;
    })
    .addCase(getVideos.rejected, (state, action) => {
      state.pending = false;
      state.error = true;

      handleError(action.payload);
    })

    .addCase(getDetailVideo.pending, (state) => {
      state.pending = true;
    })
    .addCase(getDetailVideo.fulfilled, (state, { payload }) => {
      console.log("get detail video: ", payload);
      state.detailVideo = payload.data;
      state.pending = false;
    })
    .addCase(getDetailVideo.rejected, (state, action) => {
      state.pending = false;
      state.error = true;

      handleError(action.payload);
    })

    .addCase(deleteVideo.pending, (state) => {
      state.pending = true;
    })
    .addCase(deleteVideo.fulfilled, (state, { payload }) => {
      state.deleteSuccess = payload;
      message.success("Delete content success!");
    })
    .addCase(deleteVideo.rejected, (state, action) => {
      state.pending = false;
      state.error = true;
      handleError(action.payload);
    })

    .addCase(updateVideo.pending, (state) => {
      console.log("update");
    })
    .addCase(updateVideo.fulfilled, (state, { payload }) => {
      message.success("Update success!");
    })
    .addCase(updateVideo.rejected, (state, action) => {})

    .addCase(feedbackVideo.pending, (state) => {
      console.log("update");
    })
    .addCase(feedbackVideo.fulfilled, (state, { payload }) => {
      state.detailVideo.feedbacks.push(payload.data);
      message.success("Feedback success!");
    })
    .addCase(feedbackVideo.rejected, (state, action) => {});
});
