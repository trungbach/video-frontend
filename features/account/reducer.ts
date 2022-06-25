import { handleError, instance } from "@/config/apiConfig";
import { createReducer } from "@reduxjs/toolkit";
import { message } from "antd";
import { DAY_EXPIRED_TOKEN, KEY_TOKEN, KEY_USER_DATA } from "config/constant";
import cookies from "js-cookie";
import { BaseResponse } from "types/app";
import { AccountState, User } from "./../../types/account/index";
import {
  followUser,
  getDetailUser,
  getUser,
  getUsers,
  login,
  logout,
  register,
  unfollowUser,
} from "./actions";

const initialState: AccountState<BaseResponse<User>> = {
  pending: false,
  error: false,
};

export const accountReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(login.pending, (state) => {
      state.pending = true;
    })
    .addCase(login.fulfilled, (state, { payload }) => {
      state.pending = false;
      state.user = payload.data;
      var token = payload.data?.accessToken as string;
      instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      cookies.set(KEY_TOKEN, token, { expires: DAY_EXPIRED_TOKEN });
      localStorage.setItem(KEY_USER_DATA, JSON.stringify(payload.data));
      message.info(payload.message);
    })
    .addCase(login.rejected, (state, action) => {
      state.pending = false;
      state.error = true;
      state.response = undefined;

      handleError(action.payload);
    })
    .addCase(register.pending, (state) => {
      state.pending = true;
    })
    .addCase(register.fulfilled, (state, { payload }) => {
      state.pending = false;
      state.registerResponse = payload;
      message.info(payload.message);
    })
    .addCase(register.rejected, (state, action) => {
      state.pending = false;
      state.error = true;
      state.registerResponse = undefined;
      handleError(action.payload);
    })
    .addCase(logout, (state) => {
      cookies.remove(KEY_TOKEN);
      localStorage.removeItem(KEY_USER_DATA);
      state.user = undefined;
    })
    .addCase(getUser, (state) => {
      var userString = localStorage.getItem(KEY_USER_DATA);
      state.user = userString ? JSON.parse(userString) : undefined;
    })

    .addCase(getUsers.pending, (state) => {
      state.pending = true;
    })
    .addCase(getUsers.fulfilled, (state, { payload }) => {
      state.pending = false;
      state.users = payload.data;
      state.totalRecord = payload.totalRecord;
    })
    .addCase(getUsers.rejected, (state, action) => {
      state.pending = false;
      handleError(action.payload);
    })

    .addCase(getDetailUser.pending, (state) => {
      state.pending = true;
    })
    .addCase(getDetailUser.fulfilled, (state, { payload }) => {
      state.pending = false;
      state.detailUser = payload.data;
    })
    .addCase(getDetailUser.rejected, (state, action) => {
      state.pending = false;
      handleError(action.payload);
    })

    .addCase(followUser.pending, (state) => {
      console.log("followUser pending");
    })
    .addCase(followUser.fulfilled, (state, { payload }) => {
      message.success("Follow success");
    })
    .addCase(followUser.rejected, (state, action) => {
      handleError(action.payload);
    })

    .addCase(unfollowUser.pending, (state) => {
      console.log("unfollowUser pending");
    })
    .addCase(unfollowUser.fulfilled, (state, { payload }) => {
      message.success("Unfollow success");
    })
    .addCase(unfollowUser.rejected, (state, action) => {
      handleError(action.payload);
    });
});

export default accountReducer;
