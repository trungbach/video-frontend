import { handleError, instance } from "@/config/apiConfig";
import { createReducer } from "@reduxjs/toolkit";
import { message } from "antd";
import { DAY_EXPIRED_TOKEN, KEY_TOKEN, KEY_USER_DATA } from "config/constant";
import cookies from "js-cookie";
import { Router } from "next/router";
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
  createUser,
  updateUser,
  deleteUser,
} from "./actions";

const initialState: AccountState<BaseResponse<User>> = {
  pending: false,
  error: false,
  deleteSuccess: false,
  createUserSuccess: false,
  toggleFollow: false,
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

    .addCase(createUser.pending, (state) => {
      state.pending = true;
    })
    .addCase(createUser.fulfilled, (state, { payload }) => {
      state.pending = false;
      state.createUserSuccess = !state.createUserSuccess;
      message.success("Create User Success!");
    })
    .addCase(createUser.rejected, (state, action) => {
      state.pending = false;
      state.error = true;
      handleError(action.payload);
    })

    .addCase(updateUser.pending, (state) => {})
    .addCase(updateUser.fulfilled, (state, { payload }) => {
      message.success("Update User Success!");
      if (payload.id === state?.user?.id) {
        state.user = payload;
        localStorage.setItem(KEY_USER_DATA, JSON.stringify(payload));
      }
    })
    .addCase(updateUser.rejected, (state, action) => {
      state.error = true;
      handleError(action.payload);
    })

    .addCase(deleteUser.pending, (state) => {})
    .addCase(deleteUser.fulfilled, (state, { payload }) => {
      message.success("Delete User Success!");
      state.deleteSuccess = !state.deleteSuccess;
    })
    .addCase(deleteUser.rejected, (state, action) => {
      state.error = true;
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
      state.toggleFollow = !state.toggleFollow;
    })
    .addCase(followUser.rejected, (state, action) => {
      handleError(action.payload);
    })

    .addCase(unfollowUser.pending, (state) => {
      console.log("unfollowUser pending");
    })
    .addCase(unfollowUser.fulfilled, (state, { payload }) => {
      message.success("Unfollow success");
      state.toggleFollow = !state.toggleFollow;
    })
    .addCase(unfollowUser.rejected, (state, action) => {
      handleError(action.payload);
    });
});

export default accountReducer;
