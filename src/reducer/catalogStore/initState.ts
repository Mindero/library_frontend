import { AuthorBook } from "../../util/authorListToHtml";

export interface Genre {
  id: number
  name: string,
  url: string,
}

interface CatalogState {
  bookGenres: Genre[],
  expandedAuthor: number | null,
  expandedAuthorBooks: AuthorBook[],
}

export const initialState: CatalogState = {
  bookGenres: [],
  expandedAuthor: null,
  expandedAuthorBooks:[]
};