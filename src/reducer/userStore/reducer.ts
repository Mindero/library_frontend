import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppState } from "../../store";
import { initialState } from "./initState";

export const slice = createSlice({
  name: 'userStore',
  initialState,
  reducers: {
    setIsAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
    },
    setJwt : (state, action: PayloadAction<string>) => {
      state.jwt = action.payload;
    }
  }
});

export const userAuthSelector = (state: AppState) => state.userStore.isAuth;
export const userJwtSelector = (state: AppState) => state.userStore.jwt;