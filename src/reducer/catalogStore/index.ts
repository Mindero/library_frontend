import { catalogSlice } from "./reducer";

export const{
  setBooksGenres,
  setExpandedAuthor,
  setExpandedAuthorBooks,
} = catalogSlice.actions;

export default catalogSlice.reducer;