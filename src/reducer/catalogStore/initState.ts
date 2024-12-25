import { AuthorBook } from "../../util/authorListToHtml";

export interface Genre {
  id: number
  name: string,
  url: string,
}

interface CatalogState {
  bookGenres: Genre[],
  authorCountries: string[],
  expandedAuthor: number | null,
  expandedAuthorBooks: AuthorBook[],
}

export const initialState: CatalogState = {
  bookGenres: [],
  authorCountries: [],
  expandedAuthor: null,
  expandedAuthorBooks:[]
};