import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppState } from "../../store";
import { Genre, initialState } from "./initState";

export const catalogSlice = createSlice({
  name: 'catalogStore',
  initialState,
  reducers: {
    setBooksGenres: (state, action: PayloadAction<Genre[]>) => {
      state.bookGenres = action.payload;
    },
  }
});

export const catalogBooksGenres = (state: AppState) => state.catalogStore.bookGenres;