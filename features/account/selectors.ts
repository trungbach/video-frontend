import { RootState } from "../../store";
import { createSelector } from '@reduxjs/toolkit';

export const accountProvince = (state: RootState) => state.account

export const accountSelector = createSelector(
  accountProvince,
  state => state
)