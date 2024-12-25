import { catalogSlice } from "./reducer";

export const{
  setBooksGenres,
  setAuthorCountries,
  setExpandedAuthor,
  setExpandedAuthorBooks,
} = catalogSlice.actions;

export default catalogSlice.reducer;