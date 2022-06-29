import { KEY_USER_DATA } from "config/constant";
import { message } from "antd";
import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { BaseResponse, ErrorResponse } from "types/app";
import { instance } from "@/config/apiConfig";
import {
  LoginRequest,
  RegisterRequest,
  User,
  FollowRequest,
  GetUserRequest,
  GetDetailUserRequest,
} from "@/types/account";
import { LOGIN_END_POINT, REGISTER_END_POINT } from "@/config/endpoint";
export const login = createAsyncThunk<
  BaseResponse<User>,
  LoginRequest,
  { rejectValue: ErrorResponse }
>("account/login", async (payload: LoginRequest, thunkAPI) => {
  try {
    const response = await instance.post(LOGIN_END_POINT, payload);
    return {
      data: response.data.body,
      message: response.data.message,
    };
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response);
  }
});

export const register = createAsyncThunk<
  BaseResponse<User>,
  RegisterRequest,
  { rejectValue: ErrorResponse }
>("account/register", async (payload: RegisterRequest, thunkAPI) => {
  try {
    const response = await instance.post(REGISTER_END_POINT, payload);
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response);
  }
});

export const getUsers = createAsyncThunk<
  BaseResponse<User[]>,
  GetUserRequest,
  { rejectValue: ErrorResponse }
>("account/get", async (params: GetUserRequest, thunkAPI) => {
  try {
    const response = await instance.get("/api/v1/user/get-user", { params });
    return {
      data: response.data.body,
      totalRecord: response.data.totalRecord,
      message: response.data.message,
    };
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response);
  }
});

export const getDetailUser = createAsyncThunk<
  BaseResponse<User>,
  GetDetailUserRequest,
  { rejectValue: ErrorResponse }
>("account/get-detail", async (params: GetDetailUserRequest, thunkAPI) => {
  try {
    const response = await instance.get("/api/v1/user/detail", { params });
    return {
      data: response.data.body,
      message: response.data.message,
    };
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response);
  }
});

export const deleteUser = createAsyncThunk<any, GetUserRequest, { rejectValue: ErrorResponse }>(
  "account/delete",
  async (payload: GetUserRequest, thunkAPI) => {
    try {
      const response = await instance.post("api/admin/v1/user/delete-user", payload);
      return response;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);

export const updateUser = createAsyncThunk<any, GetUserRequest, { rejectValue: ErrorResponse }>(
  "account/update",
  async (payload: GetUserRequest, thunkAPI) => {
    try {
      const response = await instance.post("api/admin/v1/auth/edit-user", payload);

      return payload;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);

export const createUser = createAsyncThunk<any, GetUserRequest, { rejectValue: ErrorResponse }>(
  "account/create",
  async (payload: GetUserRequest, thunkAPI) => {
    try {
      const response = await instance.post("api/admin/v1/auth/add-user", payload);
      return response;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);

export const followUser = createAsyncThunk<any, FollowRequest, { rejectValue: ErrorResponse }>(
  "account/follow",
  async (payload: FollowRequest, thunkAPI) => {
    try {
      const response = await instance.post("/api/v1/follow/follow", payload);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);

export const unfollowUser = createAsyncThunk<any, FollowRequest, { rejectValue: ErrorResponse }>(
  "account/unfollow",
  async (payload: FollowRequest, thunkAPI) => {
    try {
      const response = await instance.post("/api/v1/follow/unfollow", payload);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);

export const logout = createAction("account/logout");

export const getUser = createAction("account/getUser");
