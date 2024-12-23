export interface Genre {
  id: number
  name: string,
  url: string,
}

interface CatalogState {
  bookGenres: Genre[]
}

export const initialState: CatalogState = {
  bookGenres: [],
};