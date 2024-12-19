import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppState } from "../../store";
import { initialState } from "./initState";

export const settingsSlice = createSlice({
  name: 'settingsStore',
  initialState,
  reducers: {
    startLoading(state) {
      state.loading = true;
    },
    stopLoading(state) {
      state.loading = false;
    },
    showModal(state){
      state.showModal = true;
    },
    disableModal(state){
      state.showModal = false;
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.showModal = true;
    },
    clearError(state) {
      state.error = null;
      state.showModal = false;
    },
  }
});

export const settingsLoading = (state: AppState) => state.settingsStore.loading;
export const settingsError = (state: AppState) => state.settingsStore.error;
export const settingsShowModal = (state: AppState) => state.settingsStore.showModal;