import { RootState } from "../../store";
import { createSelector } from "@reduxjs/toolkit";

export const videos = (state: RootState) => state.video;

export const videoSelector = createSelector(videos, (state) => state);
