import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";

import { accountReducer } from "../features/account";
import { videoReducer } from "@/features/video";

export const store = configureStore({
  reducer: {
    account: accountReducer,
    video: videoReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
