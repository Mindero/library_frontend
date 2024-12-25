import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppState } from "../../store";
import { Genre, initialState } from "./initState";
import { AuthorBook } from "../../util/authorListToHtml";

export const catalogSlice = createSlice({
  name: 'catalogStore',
  initialState,
  reducers: {
    setBooksGenres: (state, action: PayloadAction<Genre[]>) => {
      state.bookGenres = action.payload;
    },
    setAuthorCountries: (state, action: PayloadAction<string[]>) => {
      state.authorCountries = action.payload;
    },
    setExpandedAuthor: (state, action: PayloadAction<number | null>) => {
      state.expandedAuthor = action.payload;
    },
    setExpandedAuthorBooks: (state, action: PayloadAction<AuthorBook[]>) => {
      state.expandedAuthorBooks = action.payload;
    }
  }
});

export const catalogBooksGenres = (state: AppState) => state.catalogStore.bookGenres;
export const catalogAuthorCountries = (state: AppState) => state.catalogStore.authorCountries;
export const catalogExpandedAuthor = (state: AppState) => state.catalogStore.expandedAuthor;
export const catalogExpandedAuthorBooks = (state: AppState) => state.catalogStore.expandedAuthorBooks;