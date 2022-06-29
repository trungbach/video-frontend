import { createAsyncThunk } from "@reduxjs/toolkit";
import { BaseResponse, ErrorResponse } from "types/app";
import { instance } from "@/config/apiConfig";
import {
  Video,
  GetVideoRequest,
  GetDetailRequest,
  DeleleRequest,
  ViewRequest,
  FeedbackRequest,
} from "@/types/video";

export const createVideo = createAsyncThunk<
  BaseResponse<Video>,
  Video,
  { rejectValue: ErrorResponse }
>("video/create", async (payload: Video, thunkAPI) => {
  try {
    const response = await instance.post("api/v1/video/create", payload);
    return {
      data: response.data.body,
      message: response.data.message,
    };
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response);
  }
});

export const getVideos = createAsyncThunk<
  BaseResponse<Video[]>,
  GetVideoRequest,
  { rejectValue: ErrorResponse }
>("video/get-videos", async (params: GetVideoRequest, thunkAPI) => {
  try {
    const response = await instance.get("api/v1/video/get-videos", { params });
    return {
      data: response.data.body,
      message: response.data.message,
    };
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response);
  }
});

export const deleteVideo = createAsyncThunk<
  BaseResponse<string>,
  DeleleRequest,
  { rejectValue: ErrorResponse }
>("video/delete", async (payload: DeleleRequest, thunkAPI) => {
  try {
    const response = await instance.post("api/v1/video/delete", payload);
    return {
      message: response.data.message,
    };
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response);
  }
});

export const getDetailVideo = createAsyncThunk<
  BaseResponse<any>,
  GetDetailRequest,
  { rejectValue: ErrorResponse }
>("video/get-detail", async (params: GetDetailRequest, thunkAPI) => {
  try {
    const response = await instance.get("api/v1/video/get-detail", { params });
    return {
      data: response.data.body,
      message: response.data.message,
    };
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response);
  }
});

export const updateVideo = createAsyncThunk<
  BaseResponse<string>,
  DeleleRequest,
  { rejectValue: ErrorResponse }
>("video/update", async (payload: DeleleRequest, thunkAPI) => {
  try {
    const response = await instance.post("api/v1/video/update", payload);
    return {
      message: response.data.message,
      data: response.data.body,
    };
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response);
  }
});

export const viewVideo = createAsyncThunk<
  BaseResponse<string>,
  ViewRequest,
  { rejectValue: ErrorResponse }
>("video/view", async (payload: ViewRequest, thunkAPI) => {
  try {
    const response = await instance.post("api/v1/video/view", payload);
    return {
      message: response.data.message,
    };
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response);
  }
});

export const feedbackVideo = createAsyncThunk<
  BaseResponse<string>,
  FeedbackRequest,
  { rejectValue: ErrorResponse }
>("video/feedback", async (payload: FeedbackRequest, thunkAPI) => {
  try {
    const response = await instance.post("/api/v1/feedback/create", payload);
    return {
      message: response.data.message,
      data: response.data.body,
    };
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response);
  }
});

export const updateFeedbackVideo = createAsyncThunk<
  BaseResponse<string>,
  FeedbackRequest,
  { rejectValue: ErrorResponse }
>("video/update-feedback", async (payload: FeedbackRequest, thunkAPI) => {
  try {
    const response = await instance.post("/api/v1/feedback/update", payload);
    return {
      message: response.data.message,
      data: response.data.body,
    };
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response);
  }
});
