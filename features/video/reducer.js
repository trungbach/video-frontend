import { createReducer } from "@reduxjs/toolkit";
import {
  createVideo,
  getVideos,
  deleteVideo,
  getDetailVideo,
  updateVideo,
  feedbackVideo,
  updateFeedbackVideo,
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
      console.log("oayload", payload);
      state.detailVideo = payload.data;
      message.success("Update success!");
    })
    .addCase(updateVideo.rejected, (state, action) => {
      console.log("action", action);
      message.error(action.payload.data.message);
    })

    .addCase(feedbackVideo.pending, (state) => {
      console.log("update");
    })
    .addCase(feedbackVideo.fulfilled, (state, { payload }) => {
      const index = state.detailVideo.feedbacks.findIndex(
        (item) => item.ownerId === payload.ownerId
      );
      if (index > -1) {
        state.detailVideo.feedbacks[index] = payload;
      } else {
        state.detailVideo.feedbacks.push(payload.data);
      }

      message.success("Feedback success!");
    })
    .addCase(feedbackVideo.rejected, (state, action) => {})

    .addCase(updateFeedbackVideo.pending, (state) => {
      console.log("update");
    })
    .addCase(updateFeedbackVideo.fulfilled, (state, { payload }) => {
      console.log("pay", payload.data);
      const index = state.detailVideo.feedbacks.findIndex(
        (item) => item.ownerId === payload.data.ownerId
      );
      if (index > -1) {
        state.detailVideo.feedbacks[index].user = payload.data.user;
        state.detailVideo.feedbacks[index].comment = payload.data.comment;
        state.detailVideo.feedbacks[index].rate = payload.data.rate;
      }

      message.success("Update feedback success!");
    })
    .addCase(updateFeedbackVideo.rejected, (state, action) => {});
});
